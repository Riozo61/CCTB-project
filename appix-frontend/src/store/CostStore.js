import {makeAutoObservable} from 'mobx';

export default class CostStore {
  constructor() {
    this._cost = []
    makeAutoObservable(this);
  };

  addCost(cost) {
    this._cost.push(cost)
  }
  clearCost() {
    this._cost = []
  }

  setCost(cost) {
    this._cost = cost
  };

  get cost() {
    return this._cost
  };

};