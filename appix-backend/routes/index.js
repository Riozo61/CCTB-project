const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')
const orderRouter = require('./orderRouter')
const materialsRouter = require('./materialsRouter')
const equipmentRouter = require('./equipmentRouter')
const employeeRouter = require('./employeeRouter')
const othersRouter = require('./othersRouter')
const costRouter = require('./costRouter')
const brandRouter = require('./brandRouter')
const partnerRouter = require('./partnerRouter')
const shopRouter = require('./shopRouter')

router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/order', orderRouter)
router.use('/material', materialsRouter)
router.use('/equipment', equipmentRouter)

router.use('/employee', employeeRouter)
router.use('/others', othersRouter)
router.use('/cost', costRouter)
router.use('/brand', brandRouter)
router.use('/partner', partnerRouter)
router.use('/shop', shopRouter)


module.exports = router