import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createContext } from 'react';
import UserStore from './store/UserStore';
import OrderStore from './store/OrderStore';
import ProjectStore from './store/ProjectStore';
import MaterialStore from './store/MaterialStore';
import MemberStore from './store/MemberStore';
import EquipmentlStore from './store/EquipmentStore';
import OtherMemberStore from './store/OtherMemberStore';
import CostStore from './store/CostStore';


export const Context = createContext(null);
console.log(process.env.REACT_APP_API_URL)

ReactDOM.render(
  
  <Context.Provider value={{
    user: new UserStore(),
    order: new OrderStore(),
    project: new ProjectStore(),
    material: new MaterialStore(),
    member: new MemberStore(),
    equipment: new EquipmentlStore(),
    otherMember: new OtherMemberStore(),
    cost: new CostStore(),

  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
