const uuid = require('uuid')
const path = require('path');
const Order = require('../models')
const ApiError = require('../error/ApiError');

class OrderController {
    async create(req, res, next) {
            const {orderName,supplier,project,measure,shopName,brand,quantity} = req.body
            if (!orderName || !project || !supplier || !project || !measure || !quantity ) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const ord = await Order.Order.findOne({where: {orderName}})
            if (ord) {
                return next(ApiError.badRequest('Заявка с таким названием уже существует'))
            }

            const order = await Order.Order.create({orderName,supplier,project,measure,shopName,brand,quantity})
        
            return res.json(order)
        }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let orders;
        projects = await Order.Order.findAndCountAll({limit, offset})
        return res.json(orders)
       
    }


}

module.exports = new OrderController()