const USER = require('../models/User')
const PLACE = require('../models/Place')
const bcrypt = require('bcrypt');
const bcryptSalt = bcrypt.genSaltSync(7);
const jwt = require('jsonwebtoken');

//@desc Register user
// @route POST /user/register
//@access public
const registerUser = async (req,res)=>{
    const {name, email, password} = req.body;

    // Register user
    const createdUser = await USER.create({
        name: name,
        email,
        password: await bcrypt.hash(password, bcryptSalt)
    })

    res.status(201).json(createdUser);
}

//@desc Login User
// @route POST /user/login
//@access public
const loginUser =  async (req,res)=>{
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
}

//@desc Get Current User Data
// @route GET /user/profile
//@access private
const currentUser = (req,res)=>{
    if (req.user) {
        return res.status(200).json(req.user)
    }else{
        return res.status(401).json(null)
    }

}

//@desc Get Current User Data
// @route POST /user/logout
//@access private
const logoutUser = (req,res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'   //cookie available to all routes
      }).json(true);
}

//@desc Get all places information of current user
// @route GET /user/user-places
//@access private
const userPlaces = async (req,res)=>{   //My accomodations
    if (req.user) {
        const placesList = await PLACE.find({owner: req.user.id})
        return res.status(200).json(placesList);
    }else{
        return res.status(401).json("User is not authenticated. Please log in to access this resource.")
    } 
   
}

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    logoutUser,
    userPlaces
}