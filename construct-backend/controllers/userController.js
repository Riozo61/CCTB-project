const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models')
const uuid = require('uuid')
const ApiError = require('../error/ApiError');


const generateJwt = (id,email,role)=> {
    return jwt.sign({id,email,role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}

class UserController {
    async registration(req, res, next) {
        const {firstName, lastName,email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.User.create({firstName, lastName,email, password, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req,res,next){
        const {email,password} = req.body
        const user = await User.User.findOne({where: {email}})
            if(!user) {
                return next(ApiError.internal('User not found'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword){
                return next(ApiError.internal('Incorrect password'))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})

    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let  users;
        users = await User.User.findAndCountAll({limit, offset})
        return res.json(users)
       
    }

}

module.exports = new UserController()