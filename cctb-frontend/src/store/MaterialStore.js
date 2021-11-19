import {makeAutoObservable} from 'mobx';

export default class MaterialStore {
  constructor() {
    this._material = []

    makeAutoObservable(this);
  };

  setMaterial(order) {
    this._material = order
  };

  get material() {
    return this._material
  };

};