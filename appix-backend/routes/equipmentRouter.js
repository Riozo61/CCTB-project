const Router = require('express')
const router = new Router()
const equipmentController = require('../controllers/equipmentController')

router.post('/newequipment', equipmentController.create)
router.get('/equipment', equipmentController.getAll)


module.exports = router