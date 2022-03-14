const Router = require('express')
const router = new Router()
const costController = require('../controllers/costController')


router.post('/newcost', costController.create)
router.get('/costs', costController.getAll)

module.exports = router