import {makeAutoObservable} from 'mobx';

export default class MaterialStore {
  constructor() {
    this._material = []

    makeAutoObservable(this);
  };
  addMaterial(material) {
    this._material.push(material)
  }
  clearMaterial() {
    this._material = []
  }

  setMaterial(order) {
    this._material = order
  };

  get material() {
    return this._material
  };

};