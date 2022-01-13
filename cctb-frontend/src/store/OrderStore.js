import {makeAutoObservable} from 'mobx';

export default class OrderStore {
  constructor() {
    this._order = []

    makeAutoObservable(this);
  };
  addOrder(order) {
    this._order.push(order)
  }
  clearOrder() {
    this._order = []
  }

  setOrder(order) {
    this._order = order
  };

  get order() {
    return this._order
  };

};