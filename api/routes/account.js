const {Router} = require("express");
const {Bookingprofile} = require('../controllers/accountController')

const router = Router();

router.get('/bookings/:id', Bookingprofile)

module.exports = router;