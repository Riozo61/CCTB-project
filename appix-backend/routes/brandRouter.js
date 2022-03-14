const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')


router.post('/newbrand', brandController.create)
router.get('/brands', brandController.getAll)

module.exports = router