const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')
const orderRouter = require('./orderRouter')


router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/order', orderRouter)

module.exports = router