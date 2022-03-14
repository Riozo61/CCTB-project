const uuid = require('uuid')
const path = require('path');
const Cost = require('../models')
const ApiError = require('../error/ApiError');

class CostController {
    async create(req, res, next) {
            const {estimation,description,type,project,currency} = req.body
            if (!estimation||!description||!type||!project||!currency) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const cost = await Cost.Cost.create({estimation,description,type,project,currency})
        
            return res.json(cost)
        }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let Costs;
        Costs = await Cost.Cost.findAndCountAll({limit, offset})
        return res.json(Costs)
       
    }


}

module.exports = new CostController()