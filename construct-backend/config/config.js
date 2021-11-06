require('dotenv').config();
const { CLIENT, DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env

module.exports = {
"development": {
    "username": process.env.PG_USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PG_PORT,
    "dialect": "postgres"
},
"test": {
    "username": process.env.PG_USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PG_PORT,
    "dialect": "postgres"
},
"production": {
    "username": process.env.PG_USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PG_PORT,
    "dialect": "postgres"
}
};