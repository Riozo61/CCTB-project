const Router = require('express')
const router = new Router()
const projectController = require('../controllers/projectController')

router.post('/newproject', projectController.create)
router.get('/projects', projectController.getAll)


module.exports = router