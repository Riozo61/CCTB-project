const uuid = require('uuid')
const path = require('path');
const Materials = require('../models')
const ApiError = require('../error/ApiError');

class MaterialsController {
    async create(req, res, next) {
            const {type,name,supplier,measure,shopName,quantity,brand} = req.body
            if (!type || !name || !supplier || !shopName || !measure || !quantity || !brand) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }

            const material = await Materials.Materials.create({type,name,supplier,measure,shopName,quantity, brand})
        
            return res.json(material)
        }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let materials;
        materials = await Materials.Materials.findAndCountAll({limit, offset})
        return res.json(materials)
       
    }


}

module.exports = new MaterialsController()