const PLACE = require('../models/Place')

const allPlaces =  async (req,res)=>{
    res.json(await PLACE.find({}).populate('owner'))
}

const createPlace =  async (req,res)=>{
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

}

const updatePlace =  async (req,res)=>{
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

}

const eachPlace =  async (req,res)=>{
    const id = req.params.id ;
    const place = await PLACE.findById(id).populate('owner')
    return res.status(200).json(place);
}

module.exports = {
    allPlaces,
    createPlace,
    updatePlace,
    eachPlace
}