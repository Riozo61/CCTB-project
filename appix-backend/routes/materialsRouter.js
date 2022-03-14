const Router = require('express')
const router = new Router()
const materialsController = require('../controllers/materialsController')

router.post('/newmaterial', materialsController.create)
router.get('/materials', materialsController.getAll)


module.exports = router