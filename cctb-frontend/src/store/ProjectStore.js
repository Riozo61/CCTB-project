import {makeAutoObservable} from 'mobx';

export default class ProjectStore {
  constructor() {
    this._project = [
      // {id: 1, nameProject: 'Проект 1', customer: 'Алексей', address: 'Садовая', timeline: '25.10.2021', estimation: 10000,  checked: false},
      // {id: 2, nameProject: 'Проект 2', customer: 'Алесандр', address: 'Пушкинская', timeline: '25.10.2021', estimation: 10000,  checked: false},
    ]
    makeAutoObservable(this);
  };

  setProject(project) {
    this._project = project
  };

  get project() {
    return this._project
  };

};

