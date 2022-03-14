const Router = require('express')
const router = new Router()
const partnerController = require('../controllers/partnerController')


router.post('/newpartner', partnerController.create)
router.get('/partners', partnerController.getAll)

module.exports = router