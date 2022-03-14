import { makeAutoObservable } from "mobx";

export default class BrandStore {
  constructor() {
    this._brand = []
    makeAutoObservable(this);
  };

  setBrand(brand) {
    this._brand = brand
  };
  addBrand(brand) {
    this._brand.push(brand)
  }
  clearBrand() {
    this._brand = []
  }

  get brand() {
    return this._brand
  };

};