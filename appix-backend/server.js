require('dotenv').config()
const express = require('express')
const sequelize = require('./models/index');
const models = require('./models/user')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const path = require('path')

const { PORT } = process.env

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

//app.use(authMiddleware)

app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.sequelize.authenticate()
        // await sequelize.sequelize.sync()   
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()




