const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.post('/neworder', orderController.create)
router.get('/orders', orderController.getAll)


module.exports = router