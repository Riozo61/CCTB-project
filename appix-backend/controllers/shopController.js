const uuid = require('uuid')
const path = require('path');
const Shop = require('../models')
const ApiError = require('../error/ApiError');

class ShopController {
    async create(req, res, next) {
            const {shopName} = req.body
            if (!shopName) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const shp = await Shop.Shop.findOne({where: {shopName}})
            if (shp) {
                return next(ApiError.badRequest('Магазин уже зарегистрирован'))
            }

            const shop = await Shop.Shop.create({shopName})
        
            return res.json(shop)
        }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let Shops;
        Shops = await Shop.Shop.findAndCountAll({limit, offset})
        return res.json(Shops)
       
    }


}

module.exports = new ShopController()