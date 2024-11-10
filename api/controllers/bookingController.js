const BOOKING = require('../models/Booking')

//@desc GET List of all bookings
// @route GET /bookings
//@access private
const bookingList = async (req,res)=>{    //all bookings done by user
    if (req.user) {
        const allBookings = await BOOKING.find({bookedBy: req.user.id}).populate("place") //returns array of booking objects
        return res.json(allBookings)
    
    }else{
        return res.status(401).json("User is not authenticated. Please log in to access this resource.")
    } 

}

//@desc Create Booking
// @route POST /bookings
//@access private
const bookingCreate = async (req,res)=>{    //CREATE BOOKING
    if (req.user) {
        const { place, checkIn, checkOut ,numberOfGuests , fullName, phoneNumber, price } = req.body
        const createdBooking = await BOOKING.create({
            bookedBy: req.user.id, place, checkIn, checkOut ,numberOfGuests , fullName, phoneNumber, price 
        })
        return res.status(201).json(createdBooking)
    
    }else{
        return res.status(401).json("User is not authenticated. Please log in to access this resource.")
    }
}
module.exports = {
    bookingList,
    bookingCreate
}