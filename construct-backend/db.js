const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DATABASE,
    process.env.PG_USER,
    process.env.PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.HOST,
        port: process.env.PG_PORT
    }

)