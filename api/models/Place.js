const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    photos: [{}] ,          //Array of objects
    description:String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    pricePerNight: Number,
})

module.exports = mongoose.model('Place', PlaceSchema)