const Router = require('express')
const router = new Router()
const employeeController = require('../controllers/employeeController')


router.post('/newemployee', employeeController.create)
router.get('/employees', employeeController.getAll)

module.exports = router