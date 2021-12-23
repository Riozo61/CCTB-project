import { Button, Card, Container, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Context } from "../index";
// import { login, registration } from "../http/userAPI";
import { login, registration } from "../http/axios/userAPI";

import {
  LOGIN_ROUTE,
  PROJECTS_ROUTE,
  REGISTRATION_ROUTE,
} from "../utils/consts";
import useInput from "../components/Validations/Hooks/useInput";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();

  const isLogin = location.pathname === LOGIN_ROUTE;
  const email = useInput("", { isEmpty: true, minLength: 5, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 6, maxLength: 20 });
  const firstName = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 20,
  });
  const lastName = useInput("", { isEmpty: true, minLength: 2, maxLength: 20 });
  const role = useInput("", { isEmpty: true, minLength: 2});
  const company = useInput("", { isEmpty: true, minLength: 2, maxLength: 25 });
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
        data = await login(email.value, password.value);
        user.setUser({
          email: email.value,
          password: password.value,
          token: data.token
        });
        if (data) {
          user.setToken(data.token);
          user.setIsAuth(true);
          history.push(PROJECTS_ROUTE);
        }
      } else {
        data = await registration(
          email.value,
          password.value,
          firstName.value,
          lastName.value,
          company.value,
          role.value
        );
        console.log(data);
        user.setUser({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          role: role.value,
          password: password.value,
          company: company.value,
        });
        if (data) {
          user.setToken(data.token);
          user.setIsAuth(true);
          history.push(PROJECTS_ROUTE);
        }
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container>
    <Box style={{}}>
      <Card style={{ width: 600, marginLeft: 'auto', marginRight: 'auto'}}>
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
                value={email.value}
                onChange={(e) => email.onChange(e)}
                onBlur={(e) => email.onBlur(e)}
              />
              {email.isDirty && email.isEmpty && (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
              )}
              {email.isDirty && email.minLengthError && (
                <div style={{ color: "red" }}>Некорректная длина</div>
              )}
              {email.isDirty && email.emaiError && (
                <div style={{ color: "red" }}>Некорректный email</div>
              )}

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
                value={password.value}
                onChange={(e) => password.onChange(e)}
                onBlur={(e) => password.onBlur(e)}
              />
              {password.isDirty && password.isEmpty && (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
              )}
              {password.isDirty && password.minLengthError && (
                <div style={{ color: "red" }}>Некорректная длина</div>
              )}
              {password.isDirty && password.maxLengthError && (
                <div style={{ color: "red" }}>Слишком длинный пароль</div>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={click}
                style={{ marginTop: 15 }}
                disabled={!email.inputValid || !password.inputValid}
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
                value={firstName.value}
                onChange={(e) => firstName.onChange(e)}
                onBlur={(e) => firstName.onBlur(e)}

              />
              {firstName.isDirty && firstName.isEmpty && (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
              )}
              {firstName.isDirty && firstName.minLengthError && (
                <div style={{ color: "red" }}>Слишком короткое имя</div>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Фамилия"
                name="lastName"
                autoComplete="lastName"
                value={lastName.value}
                onChange={(e) => lastName.onChange(e)}
                onBlur={(e) => lastName.onBlur(e)}

              />
              {lastName.isDirty && lastName.isEmpty && (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
              )}
              {lastName.isDirty && lastName.minLengthError && (
                <div style={{ color: "red" }}>Слишком короткая фамилия</div>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Электронная почта"
                name="email"
                autoComplete="email"
                value={email.value}
                onChange={(e) => email.onChange(e)}
                onBlur={(e) => email.onBlur(e)}
              />
              {email.isDirty && email.isEmpty && (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
              )}
              {email.isDirty && email.minLengthError && (
                <div style={{ color: "red" }}>Некорректная длина</div>
              )}
              {email.isDirty && email.emaiError && (
                <div style={{ color: "red" }}>Некорректный email</div>
              )}

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
                value={role.value}
                onChange={(e) => role.onChange(e)}
                onBlur={(e) => role.onBlur(e)}

              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {role.isDirty && role.isEmpty && (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                value={password.value}
                onChange={(e) => password.onChange(e)}
                onBlur={(e) => password.onBlur(e)}
              />
              {password.isDirty && password.isEmpty && (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
              )}
              {password.isDirty && password.minLengthError && (
                <div style={{ color: "red" }}>Некорректная длина</div>
              )}
              {password.isDirty && password.maxLengthError && (
                <div style={{ color: "red" }}>Слишком длинный пароль</div>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="company"
                label="Название компании"
                name="company"
                autoComplete="company"
                value={company.value}
                onChange={(e) => company.onChange(e)}
                onBlur={(e) => company.onBlur(e)}

              />
                {company.isDirty && company.isEmpty && (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
              )}
              {company.isDirty && company.minLengthError && (
                <div style={{ color: "red" }}>Слишком короткое название компании</div>
              )}


              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={click}
                style={{ marginTop: 15 }}
                disabled={!email.inputValid || !password.inputValid || !firstName.inputValid || !lastName.inputValid || !role.inputValid || !company.inputValid}
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
      </Box>
    </Container>
  );
});

export default Auth;
