import {makeAutoObservable} from 'mobx';

export default class EquipmentlStore {
  constructor() {
    this._equipment = []

    makeAutoObservable(this);
  };
  addEquipment(equipment) {
    this._equipment.push(equipment)
  }
  clearEquipment() {
    this._equipment = []
  }


  setEquipment(equipment) {
    this._equipment = equipment
  };

  get equipment() {
    return this._equipment
  };

};