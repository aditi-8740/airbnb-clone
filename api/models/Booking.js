const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    place:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    bookedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    checkIn:{
        type: Date,
        required: true,
    },
    checkOut:{
        type: Date,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Booking', BookingSchema)