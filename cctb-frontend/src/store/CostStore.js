import {makeAutoObservable} from 'mobx';

export default class CostStore {
  constructor() {
    this._cost = []
    makeAutoObservable(this);
  };

  setCost(cost) {
    this._cost = cost
  };

  get cost() {
    return this._cost
  };

};