import {makeAutoObservable} from 'mobx';

export default class OtherMemberStore {
  constructor() {
    this._otherMember = []
    makeAutoObservable(this);
  };

  setOtherMember(otherMember) {
    this._otherMember = otherMember
  };

  get otherMember() {
    return this._otherMember
  };

};