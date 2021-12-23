const uuid = require('uuid')
const path = require('path');
const Others = require('../models')
const ApiError = require('../error/ApiError');

class OthersController {
    async create(req, res, next) {
        const {email,firstName,lastName,phone,type} = req.body
        if (!email||!firstName||!lastName||!phone||!type ) {
            return next(ApiError.badRequest('Заполните обязательные поля'))
        }
        const othrs = await Others.Others.findOne({where: {email}})
        if (othrs) {
            return next(ApiError.badRequest('Контрагент уже зарегистрирован'))
        }

        const others = await Others.Others.create({email,firstName,lastName,phone,type})
    
        return res.json(others)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let Other;
        Other = await Others.Others.findAndCountAll({limit, offset})
        return res.json(Other)
       
    }


}

module.exports = new OthersController()