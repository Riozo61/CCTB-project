const uuid = require('uuid')
const path = require('path');
const Cost = require('../models')
const ApiError = require('../error/ApiError');

class CostController {
    async create(req, res, next) {
            const {estimation,description,type} = req.body
            if (!estimation||!description||!type) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const cost = await Cost.Cost.create({estimation,description,type})
        
            return res.json(cost)
        }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let Costs;
        Costs = await Cost.Cost.findAndCountAll({limit, offset})
        return res.json(Costs)
       
    }


}

module.exports = new CostController()