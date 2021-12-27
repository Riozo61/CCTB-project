import {makeAutoObservable} from 'mobx';

export default class EquipmentlStore {
  constructor() {
    this._equipment = []

    makeAutoObservable(this);
  };

  setEquipment(equipment) {
    this._equipment = equipment
  };

  get equipment() {
    return this._equipment
  };

};