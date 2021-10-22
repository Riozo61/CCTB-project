const {Customer} = require('../models/models')
const uuid = require('uuid')
const ApiError = require('../error/ApiError');


class CustomerController {
    async create (req,res,next){
        const {name,payment_agreement,discount,access_to_projects} = req.body
        if(name == NULL|| payment_agreement == NULL || access_to_projects == NULL) {
            return next(ApiError.badRequest('Fill in all the fields'))
        }
    }
}

module.exports = new CustomerController()