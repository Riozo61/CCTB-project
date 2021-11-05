import {makeAutoObservable} from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._token = null;
    makeAutoObservable(this)
  };

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setToken(token) {
    this._token = token
  }
  setUser(user) {
    this._user = user
  };

  get isAuth() {
    return this._isAuth
  }
  get token() {
    return this._token
  }
  get user() {
    return this._user
  };
};