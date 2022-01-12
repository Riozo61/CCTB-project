const uuid = require('uuid')
const path = require('path');
const Employee = require('../models')
const ApiError = require('../error/ApiError');

class EmployeeController {
    async create(req, res, next) {
            const {email,firstName,lastName,role,phone,salary,type,currency} = req.body
            if (!email||!firstName||!lastName||!role||!phone||!salary||!type||!currency ) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const empl = await Employee.Employee.findOne({where: {email}})
            if (empl) {
                return next(ApiError.badRequest('Сотрудник уже зарегистрирован'))
            }

            const employee = await Employee.Employee.create({email,firstName,lastName,role,phone,salary,type,currency})
        
            return res.json(employee)
        }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let Employees;
        Employees = await Employee.Employee.findAndCountAll({limit, offset})
        return res.json(Employees)
       
    }


}

module.exports = new EmployeeController()