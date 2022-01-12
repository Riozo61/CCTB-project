const uuid = require('uuid')
const path = require('path');
const Partner = require('../models')
const ApiError = require('../error/ApiError');

class PartnerController {
    async create(req, res, next) {
            const {email,firstName,lastName,rolePartner,phone,company,type} = req.body
            if (!email||!firstName||!lastName||!rolePartner||!phone||!company||!type ) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const prtnr = await Partner.Partner.findOne({where: {email}})
            if (prtnr) {
                return next(ApiError.badRequest('Партнер уже зарегистрирован'))
            }

            const partner = await Partner.Partner.create({email,firstName,lastName,rolePartner,phone,company,type})
        
            return res.json(partner)
        }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let Partners;
        Partners = await Partner.Partner.findAndCountAll({limit, offset})
        return res.json(Partners)
       
    }


}

module.exports = new PartnerController()