const {Router} = require('express')
const {
    registerUser,
    loginUser,
    currentUser,
    logoutUser,
    userPlaces
    } = require('../controllers/userController');

const router = Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', currentUser)
router.post('/logout',  logoutUser)
router.get('/user-places',userPlaces)

module.exports = router;