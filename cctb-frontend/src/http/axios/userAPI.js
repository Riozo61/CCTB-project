import {$authHost, $host} from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (email, password, firstName, lastName, role, company) => {
  const {data} = await $host.post('api/user/registration', {email, password, firstName, lastName, company, role})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}

export const login = async (email, password) => {
  const {data} = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}

export const check = async () => {
  const {data} = await $authHost.post('api/user/registration')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}