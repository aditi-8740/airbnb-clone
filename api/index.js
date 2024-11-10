const express = require('express')
const cors = require('cors')
const app = express()
const mongoose= require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const path = require('node:path')
const fs = require('node:fs')
const {checkForAuthenticationCookie} = require('./middlewares/authentication');
const UserRouter = require('./routes/user')
const PlacesRouter = require('./routes/places')
const BookingsRouter = require('./routes/bookings')
const AccountRouter = require('./routes/account')
const {upload} = require('./middlewares/multer')
const {uploadOnCloudinary} = require('./utils/cloudinary')

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

app.post('/upload', upload.array('photos' , 20) , async (req,res)=>{   //files that came in request
    console.log(req.files);   //return metadata of files { fieldname , originalname , encoding, mimetype , destination , filename , path, size}
    if (!req.files) {
        return res.status(400).send('No files uploaded.');
      }
     // Array to store Cloudinary URLs
     const cloudinaryResults = [];
     for (const file of req.files) {
      const localFilePath = file.path;

      //Upload to Cloudinary
      const result = await uploadOnCloudinary(localFilePath);
      if(result && result.url){
        cloudinaryResults.push(result.url)  //public url of uploaded file
      }

       // Delete local file after uploading to Cloudinary
       fs.unlinkSync(localFilePath);
     }
    res.status(201).json({ files: cloudinaryResults });    
    
})

app.listen(process.env.PORT);