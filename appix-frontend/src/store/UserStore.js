import {makeAutoObservable} from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = localStorage.getItem('user.auth') ?? false;
    this._user = localStorage.getItem('user.user') ?? {};
    this._token = localStorage.getItem('user.token') ?? null;
    makeAutoObservable(this)
  };

  setIsAuth(bool) {
    localStorage.setItem('user.auth', bool)
    this._isAuth = bool;
  }
  setToken(token) {
    localStorage.setItem('user.token', token)
    this._token = token
  }
  setUser(user) {
    localStorage.setItem('user.user', user)
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