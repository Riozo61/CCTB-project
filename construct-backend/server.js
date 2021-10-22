require('dotenv').config()
const fileUpload =require('express-fileupload')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const cors = require('cors')
const express = require('express')
const path = require('path')
const sequelize = require ('./db')
const app = express()


const { PORT } = process.env

app.use(cors())
app.use(express.json())
app.use(fileUpload({ }))
app.use(express.urlencoded({ extended: false }))
app.use('/api', router)


//Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }

}
start()




