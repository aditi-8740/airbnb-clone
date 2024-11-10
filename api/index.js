const express = require('express')
const cors = require('cors')
const app = express()
const mongoose= require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('node:path')
const {checkForAuthenticationCookie} = require('./middlewares/authentication');
const UserRouter = require('./routes/user')
const PlacesRouter = require('./routes/places')
const BookingsRouter = require('./routes/bookings')
const AccountRouter = require('./routes/account')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(checkForAuthenticationCookie)

app.use('/user',UserRouter);
app.use('/places',PlacesRouter);
app.use('/bookings',BookingsRouter);
app.use('/account',AccountRouter);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join( __dirname , './uploads' ))
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
const upload = multer({ storage: storage })

app.post('/upload', upload.array('photos' , 20) , (req,res)=>{   //files that came in request
    if (!req.files) {
        return res.status(400).send('No files uploaded.');
      }
    
    res.status(201).json({ files: req.files });     //return metadata of files { fieldname , originalname , encoding, mimetype , destination , filename , path, size}
})

app.listen(process.env.PORT);