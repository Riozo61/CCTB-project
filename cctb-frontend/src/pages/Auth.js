import { Button, Card, Container, MenuItem, TextField } from "@mui/material";
import { Box} from "@mui/system";
import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { useState} from "react";
import { NavLink, useLocation, useHistory  } from "react-router-dom";
import { Context } from "../index";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, PROJECTS_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = observer( () => {
  const {user} = useContext(Context)
  const location = useLocation();
  const history = useHistory();

  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const roles = [
    {
      value: 'manager',
      label: 'Менеджер',
    },
    {
      value: 'engineer',
      label: 'Инженер',
    },
    {
      value: 'worker',
      label: 'Рабочий',
    }

  ];




  const click = async () => {
    try {
      let data;
    
      if (isLogin) {
        data = await login(email, password);
        console.log(data);
        user.setUser({
          role: role,
          firstName: firstName,
          lastName: lastName,
          email: email,
          token: data.token,
        });
        user.setToken(data.token);
        user.setIsAuth(true);
        console.log(user)
        history.push(PROJECTS_ROUTE);
        console.log(history)
      } else {
        data = await registration(email, password, role);
        console.log(data);
        user.setUser({
          role: role,
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
        user.setToken(data.token);
        user.setIsAuth(true);
        history.push(PROJECTS_ROUTE);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Card style={{ width: 600 }}>
        <h2>{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <div>
        {isLogin ? 
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронная почта"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={click}
              
            >
            
            Войти
              
            </Button>
          </div>
        :
        <div>
        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Имя"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Фамилия"
              name="lastName"
              autoComplete="lastName"
              
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронная почта"
              name="email"
              
              autoComplete="email"
              
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              select
              fullWidth
              id="outlined-select-currency"
              label="Роль"
              name="role"
              autoComplete="role"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
            {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.label}
            </MenuItem>
            ))}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={click}
              
            >
            Регистрация
            </Button>
            </div>
        }
        </div>
        <Box>
        {isLogin ? 
        
          <div>
            Нет учетной записи?
            <NavLink to={REGISTRATION_ROUTE} variant="body2">
              Регистрация
            </NavLink>
          </div>
        : 
        
        <div>
            Есть учетная запись?
            <NavLink to={LOGIN_ROUTE} variant="body2">
              Войдите
            </NavLink>
          </div>
        }
        </Box>
      </Card>
    </Container>
  );
}
)

export default Auth;
