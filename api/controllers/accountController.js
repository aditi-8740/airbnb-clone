const BOOKING = require('../models/Booking')

const Bookingprofile = async(req,res)=>{
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
    
}
module.exports = {
    Bookingprofile
}