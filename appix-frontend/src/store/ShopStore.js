import { makeAutoObservable } from "mobx";

export default class ShopStore {
  constructor() {
    this._shop = []
    makeAutoObservable(this);
  };

  setShop(shop) {
    this._shop = shop
  };
  addShop(shop) {
    this._shop.push(shop)
  }
  clearShop() {
    this._shop = []
  }

  get shop() {
    return this._shop
  };

};