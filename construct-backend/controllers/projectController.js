const uuid = require('uuid')
const path = require('path');
const Project = require('../models')
const ApiError = require('../error/ApiError');

class ProjectController {
    async create(req, res, next) {
            const {projectName, status, contract, estimation, dateStart, dateEnd,projManager,customer,customerName,payment} = req.body
            if (!projectName || !contract || !customer || !customerName ) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const proj = await Project.Project.findOne({where: {projectName}})
            if (proj) {
                return next(ApiError.badRequest('Проект с таким названием уже существует'))
            }

            const project = await Project.Project.create({projectName, status, contract, estimation, dateStart, dateEnd,projManager,customer,customerName,payment})
        
            return res.json(project)
        }

    async getAll(req, res) {
       
    }

    async getOne(req, res) {
    }
}

module.exports = new ProjectController()