import {makeAutoObservable} from 'mobx';

export default class OrderStore {
  constructor() {
    this._order = [
      {id: 1, name: 'Заявка 1', _material: [
        {id: 1, nameMat: 'Гвозди', quantity: 10},
        {id: 2, nameMat: 'Цемент', quantity: 200},
        {id: 3, nameMat: 'Молоток', quantity: 1},
      ]},
      {id: 2, name: 'Заявка 2', _material: [
        {id: 1, nameMat: 'Кирпич', quantity: 10},
        {id: 2, nameMat: 'Краска', quantity: 10},
        {id: 3, nameMat: 'Обои', quantity: 200},
        {id: 4, nameMat: 'Кисть малярная', quantity: 2},
    ]}]

    makeAutoObservable(this);
  };

  setOrder(order) {
    this._constrSite = order
  };

  get order() {
    return this._order
  };

};