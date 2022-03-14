const Router = require('express')
const router = new Router()
const shopController = require('../controllers/shopController')


router.post('/newshop', shopController.create)
router.get('/shops', shopController.getAll)

module.exports = router