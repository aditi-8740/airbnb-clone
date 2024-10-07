const express = require('express')
const cors = require('cors')
const app = express()
const mongoose= require('mongoose')
require('dotenv').config()
const USER = require('./models/User')
const PLACE = require('./models/Place')
const BOOKING = require('./models/Booking')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bcryptSalt = bcrypt.genSaltSync(7);
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('node:path')
const {checkForAuthenticationCookie} = require('./middlewares/authentication');

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,  //allowing cookies to be sent
    origin: 'http://localhost:5173',    //adding ORIGIN to tell what kind of app should be able to communicate with our API
    // optionsSuccessStatus: 200
}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// mongoose.connect(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));


app.use(checkForAuthenticationCookie)
app.post('/register', async (req,res)=>{
    const {name, email, password} = req.body;

    // registering our user
    const createdUser = await USER.create({
        name: name,
        email,
        password: await bcrypt.hash(password, bcryptSalt)
    })

    res.status(201).json(createdUser);
})

app.post('/login', async (req,res)=>{
    const {email, password} = req.body;                        
    const userGot = await USER.findOne({email});              
    
    if (userGot && await bcrypt.compare(password, userGot.password  ) ) {
        jwt.sign({ email: userGot.email ,  id: userGot._id , name: userGot.name } , process.env.PRIVATE_KEY , {} , (err,token)=>{    //generate jwt token
            if(err) throw err;
            res.cookie('token', token, {
                httpOnly: true, // Make it not accessible via JavaScript
                secure: process.env.NODE_ENV === 'production', // Set to true in production
                sameSite: 'Lax', // Controls cross-origin cookie sharing (adjust as needed)
                path: '/' // Ensure the cookie is available for all routes
              })          //sending cookie to browser, creating it.
            res.status(200).json(userGot);
        });
    }
    else{
        res.status(400).json('invalid email or password')
    }
})

app.get('/profile',  (req,res)=>{
    if (req.user) {
        return res.status(200).json(user)
    }else{
        return res.status(401).json(null)
    }

})

app.post('/logout',(req,res)=>{
    //console.log(req.headers.cookie)
   
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'   //cookie available to all routes
      }).json(true);
      
    //console.log(req.cookies);
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join( __dirname , './uploads' ))
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
const upload = multer({ storage: storage })

app.post('/upload', upload.array('photos' , 20) , (req,res)=>{    console.log(req.files);   //files the came in request
    if (!req.files) {
        return res.status(400).send('No files uploaded.');
      }
    
    res.status(201).json({ files: req.files });     //return metadata of files { fieldname , originalname , encoding, mimetype , destination , filename , path, size}
})

app.post('/places', async (req,res)=>{
    const { title, address,addedPhotos, description, perks, addInfo, checkIn, checkOut, maxGuests, pricePerNight
    } = req.body;           console.log(req.body);
    
    if(req.user){
        const createdPlace = await PLACE.create({
           owner: user.id ,
           title,
           address,
           photos: addedPhotos,
           description,
           perks,
           extraInfo:addInfo,
           checkIn,
           checkOut,
           maxGuests,
           pricePerNight
         })
        return res.json(createdPlace);
    }else{
        return res.status(401).json("Invalid login credentials. Please try again.")
    }

})

app.get('/user-places',async (req,res)=>{   //My accomodations
    if (req.user) {
        const placesList = await PLACE.find({owner: req.user.id})
        return res.status(200).json(placesList);
    }else{
        return res.status(401).json("User is not authenticated. Please log in to access this resource.")
    } 
   
})

app.put('/places/:id', async (req,res)=>{
    const id = req.params.id;
    const {title, address, addedPhotos, description, perks, addInfo, checkIn, checkOut, maxGuests, pricePerNight } = req.body ;
    
    if (req.user) {
        const updatedPlace = await PLACE.findByIdAndUpdate(id ,  {
            title, address, photos:addedPhotos, description, perks, extraInfo:addInfo, checkIn, checkOut, maxGuests ,pricePerNight
        },{ new:true })
        return res.status(200).json(updatedPlace)
    
    }else{
        return res.status(401).json("User is not authenticated. Please log in to access this resource.")
    } 

})

app.get('/places/:id',async (req,res)=>{
    const id = req.params.id ;                 //console.log(req.params);
    const place = await PLACE.findById(id).populate('owner')
    return res.status(200).json(place);
})

app.get('/places', async (req,res)=>{
    res.json(await PLACE.find({}).populate('owner'))
})

app.get('/bookings',async (req,res)=>{    //all bookings done by user
    if (req.user) {
        const allBookings = await BOOKING.find({bookedBy: req.user.id}).populate("place") //returns array of booking objects
        return res.json(allBookings)
    
    }else{
        return res.status(401).json("User is not authenticated. Please log in to access this resource.")
    } 

})

app.post('/bookings', async (req,res)=>{    //CREATE BOOKING
    if (req.user) {
        const { place, checkIn, checkOut ,numberOfGuests , fullName, phoneNumber, price } = req.body
        const createdBooking = await BOOKING.create({
            bookedBy: req.user.id, place, checkIn, checkOut ,numberOfGuests , fullName, phoneNumber, price 
        })
        return res.status(201).json(createdBooking)
    
    }else{
        return res.status(401).json("User is not authenticated. Please log in to access this resource.")
    }
})

app.get('/account/bookings/:id', async(req,res)=>{
    if (req.user) {
        const id = req.params.id;
        const foundBooking = await BOOKING.findById(id).populate('place')
        if(foundBooking){
            return res.status(200).json(foundBooking)
        }
        else{
            return res.status(404).json('The booking with the specified ID does not exist.')
        }
    
    }else{
        return res.status(401).json("User is not authenticated. Please log in to access this resource.")
    }
    
})

// rtFPf6ArVXpA3rNg
app.listen(8000);