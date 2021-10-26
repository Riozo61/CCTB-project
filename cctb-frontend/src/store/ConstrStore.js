import {makeAutoObservable} from 'mobx';

export default class ConstrSite {
  constructor() {
    this._constrSite = [
      {id: 1, name: 'Объект 1', address: 'Пушкинская', checked: true},
      {id: 2, name: 'Объект 2', address: 'Садовая', checked: false}
    ]

    makeAutoObservable(this);
  };

  setConstrSite(constrSite) {
    this._constrSite = constrSite
  };

  get constrSite() {
    return this._constrSite
  };

};
