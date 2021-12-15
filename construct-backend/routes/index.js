const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')
const orderRouter = require('./orderRouter')
const materialsRouter = require('./materialsRouter')
const equipmentRouter = require('./equipmentRouter')


router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/order', orderRouter)
router.use('/material', materialsRouter)
router.use('/equipment', equipmentRouter)

module.exports = router