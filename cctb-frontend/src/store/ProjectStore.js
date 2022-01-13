import {makeAutoObservable} from 'mobx';

export default class ProjectStore {
  constructor() {
    this._project = []
    makeAutoObservable(this);
  };

  setProject(project) {
    this._project = project
  };
  addProject(project) {
    this._project.push(project)
  }

  clearProject() {
    this._project = [];
  }

  get project() {
    return this._project
  };

};

