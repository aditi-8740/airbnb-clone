const {Router} = require('express');
const {
    bookingList,
    bookingCreate
} = require('../controllers/bookingController')

const router = Router();

router.get('/',bookingList)
router.post('/', bookingCreate)

module.exports = router;