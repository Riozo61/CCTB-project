const Router = require('express')
const router = new Router()
const othersController = require('../controllers/othersController')


router.post('/newother', othersController.create)
router.get('/others', othersController.getAll)

module.exports = router