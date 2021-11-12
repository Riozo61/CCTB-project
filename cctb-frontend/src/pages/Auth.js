import { Button, Card, Container, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Context } from "../index";
import { login, registration } from "../http/userAPI";
import {
  LOGIN_ROUTE,
  PROJECTS_ROUTE,
  REGISTRATION_ROUTE,
} from "../utils/consts";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();

  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const roles = [
    {
      value: "manager",
      label: "Менеджер",
    },
    {
      value: "engineer",
      label: "Инженер",
    },
    {
      value: "worker",
      label: "Рабочий",
    },
  ];

  const click = async () => {
    try {
      let data;

      if (isLogin) {
        data = await login(email, password);
        user.setUser({
          role: role,
          email: email,
          token: data.token,
        });
        if (data) {
          user.setToken(data.token);
          user.setIsAuth(true);
          history.push(PROJECTS_ROUTE);
        }
      } else {
        data = await registration(
          email,
          password,
          role,
          firstName,
          lastName,
          company
        );
        console.log(data);
        user.setUser({
          role: role,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          company: company,
        });
        if (data) {
          user.setToken(data.token);
          user.setIsAuth(true);
          history.push(PROJECTS_ROUTE);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Card style={{ width: 600}}>
        <h2 style={{ marginLeft: 20, marginRight: 20 }}>
          {isLogin ? "Авторизация" : "Регистрация"}
        </h2>
        <div>
          {isLogin ? (
            <div style={{ marginLeft: 20, marginRight: 20 }}>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={click}
                style={{ marginTop: 15 }}
              >
                Войти
              </Button>
            </div>
          ) : (
            <div style={{ marginLeft: 20, marginRight: 20 }}>
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
                onChange={(e) => setFirstName(e.target.value)}
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
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setRole(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="company"
                label="Название компании"
                name="company"
                autoComplete="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={click}
                style={{ marginTop: 15 }}
              >
                Регистрация
              </Button>
            </div>
          )}
        </div>
        <Box>
          {isLogin ? (
            <div
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              Нет учетной записи?
              <NavLink
                to={REGISTRATION_ROUTE}
                variant="body2"
                style={{ marginLeft: 20, marginRight: 20 }}
              >
                Регистрация
              </NavLink>
            </div>
          ) : (
            <div
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              Есть учетная запись?
              <NavLink
                to={LOGIN_ROUTE}
                variant="body2"
                style={{ marginLeft: 20, marginRight: 20 }}
              >
                Войдите
              </NavLink>
            </div>
          )}
        </Box>
      </Card>
    </Container>
  );
});

export default Auth;
