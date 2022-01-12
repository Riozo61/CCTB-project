const uuid = require('uuid')
const path = require('path');
const Brand = require('../models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
            const {brandName} = req.body
            if (!brandName ) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const brnd = await Brand.Brand.findOne({where: {brandName}})
            if (brnd) {
                return next(ApiError.badRequest('Бренд уже зарегистрирован'))
            }

            const brand = await Brand.Brand.create({brandName})
        
            return res.json(brand)
        }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let Brands;
        Brands = await Brand.Brand.findAndCountAll({limit, offset})
        return res.json(Brands)
       
    }


}

module.exports = new BrandController()