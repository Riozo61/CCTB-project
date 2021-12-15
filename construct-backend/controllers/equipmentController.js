const uuid = require('uuid')
const path = require('path');
const Equipment = require('../models')
const ApiError = require('../error/ApiError');

class EquipmentController {
    async create(req, res, next) {
            const {type,name,brand,typeObj,serialNumber} = req.body
            if (!type || !name || !typeObj || !brand || !serialNumber ) {
                return next(ApiError.badRequest('Заполните обязательные поля'))
            }
            const equip = await Equipment.Equipment.findOne({where: {serialNumber}})
            if (equip) {
                return next(ApiError.badRequest('Оборудование с таким серийным номером уже зарегистрировано'))
            }

            const equipment = await Equipment.Equipment.create({type,name,brand,typeObj,serialNumber})
        
            return res.json(equipment)
        }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let allEquipment;
        allEquipment = await Equipment.Equipment.findAndCountAll({limit, offset})
        return res.json(allEquipment)
       
    }


}

module.exports = new EquipmentController()