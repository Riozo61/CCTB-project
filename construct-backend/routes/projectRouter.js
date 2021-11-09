const Router = require('express')
const router = new Router()
const projectController = require('../controllers/projectController')

router.post('/newproject', projectController.create)


module.exports = router