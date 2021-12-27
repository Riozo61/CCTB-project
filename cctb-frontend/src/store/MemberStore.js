import {makeAutoObservable} from 'mobx';

export default class MemberStore {
  constructor() {
    this._member = []
    makeAutoObservable(this);
  };

  setMember(member) {
    this._member = member
  };

  get member() {
    return this._member
  };

};