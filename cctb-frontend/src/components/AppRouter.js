import React from 'react';
import { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';

const AppRouter = () => {
  const {user} = useContext(Context);

  console.log(user)
  return (
    <Switch>
      {user.isAuth && authRoutes.map(({path, Component}) =>
      <Route key={path} path={path} component={props => <Component {...props} />} exact />
      )}
      {publicRoutes.map(({path, Component}) =>
      <Route key={path} path={path} component={props => <Component {...props} />} exact />
      )}
      <Redirect to={LOGIN_ROUTE}/>
    </Switch>
  )
}

export default AppRouter
