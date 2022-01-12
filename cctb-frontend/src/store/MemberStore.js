import {makeAutoObservable} from 'mobx';

export default class MemberStore {
  constructor() {
    this._member = []
    makeAutoObservable(this);
  };

  setMember(member) {
    this._member = member
  };
  addMember(member) {
    this._member.push(member)
  }
  clearMembers() {
    this._member = []
  }

  get member() {
    return this._member
  };

};