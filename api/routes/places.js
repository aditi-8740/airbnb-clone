const {Router} = require('express')
const {
    allPlaces,
    createPlace,
    updatePlace,
    eachPlace
} = require('../controllers/placesController')

const router = Router();

router.get('/', allPlaces)
router.post('/', createPlace)
router.put('/:id', updatePlace)
router.get('/:id',eachPlace)

module.exports = router;