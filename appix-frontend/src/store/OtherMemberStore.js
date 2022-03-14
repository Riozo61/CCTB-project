import {makeAutoObservable} from 'mobx';

export default class OtherMemberStore {
  constructor() {
    this._otherMember = []
    makeAutoObservable(this);
  };


  setOtherMember(other) {
    this._otherMember = other
  };
  addOtherMember(other) {
    this._otherMember.push(other)
  };
  clearOtherMember() {
    this._otherMember = [];
  }
  get otherMember() {
    return this._otherMember
  };

};