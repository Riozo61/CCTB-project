const uuid = require('uuid')
const path = require('path');
const Project = require('../models')
const ApiError = require('../error/ApiError');

class ProjectController {
    async create(req, res, next) {
            const {projectName, status, contract, estimation, dateStart, dateEnd,projManager,customer,customerName,payment,currency} = req.body
            if (!projectName || !contract || !customer || !customerName ) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const proj = await Project.Project.findOne({where: {projectName}})
            if (proj) {
                return next(ApiError.badRequest('Проект с таким названием уже существует'))
            }

            const project = await Project.Project.create({projectName, status, contract, estimation, dateStart, dateEnd,projManager,customer,customerName,payment,currency})
        
            return res.json(project)
        }

    async getAll(req, res) {
        let {projManager, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let projects;
        if (!projManager) {
            projects = await Project.Project.findAndCountAll({limit, offset})
        }
        if (projManager) {
            projects = await Project.Project.findAndCountAll({where:{projManager}, limit, offset})
        }
        return res.json(projects)
       
    }


}

module.exports = new ProjectController()