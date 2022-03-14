import {makeAutoObservable} from 'mobx';

export default class PartnerStore {
  constructor() {
    this._partnerMember = []
    makeAutoObservable(this);
  };


  setPartnerMember(partner) {
    this._partnerMember = partner
  };
  addPartnerMember(partner) {
    this._partnerMember.push(partner)
  };
  clearPartnerMember() {
    this._partnerMember = [];
  }
  get partnerMember() {
    return this._partnerMember
  };

};