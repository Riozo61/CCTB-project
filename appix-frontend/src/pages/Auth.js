import { Button, Card, Container, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useContext } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Context } from "../index";
import { login, registration } from "../http/axios/userAPI";

import {
  LOGIN_ROUTE,
  PROJECTS_ROUTE,
  REGISTRATION_ROUTE,
} from "../utils/consts";
import useInput from "../components/Validations/Hooks/useInput";
import { makeStyles } from "@material-ui/core";

const Auth = observer(() => {

  const useStyles = makeStyles({
    card: {
      maxWidth: 600,
      marginRight: 'auto',
      marginLeft: 'auto'
    },
    header2: {
      marginTop: 15,
      marginLeft: 20,
      marginRight: 20 
    },
    div: {
      marginLeft: 20, 
      marginRight: 20 
    },
    box: {
      padding: 15
    }
  
  })
  const classes = useStyles();
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();

  const isLogin = location.pathname === LOGIN_ROUTE;
  const email = useInput("", { isEmpty: true, minLength: 5, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 6, maxLength: 20 });
  const [confirmPassword, setConfirmPassword] = useState("");
  const firstName = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 20,
  });
  const lastName = useInput("", { isEmpty: true, minLength: 2, maxLength: 20 });
  const role = useInput("", { isEmpty: true, minLength: 2 });
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
    {
      value: "moderator",
      label: "Модератор",
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
          token: data.token,
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
          role.value
        );
        user.setUser({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          role: role.value,
          password: password.value,
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
      <Box className={classes.box}>
        <Card className={classes.card}>
          <Typography variant="h5" className={classes.header2}>
            {isLogin ? "Авторизация" : "Регистрация"}
          </Typography>
          <div>
            {isLogin ? (
              <div className={classes.div}>
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
                  error={
                    (!email.inputValid ? true : false) &&
                    (!email.isDirty ? false : true)
                  }
                  component="pre"
                  helperText={`${
                    email.isDirty && email.isEmpty
                      ? "Поле не может быть пустым\n"
                      : ""
                  }${
                    email.isDirty && email.minLengthError
                      ? "Некорректная длина\n"
                      : ""
                  }${
                    email.isDirty && email.emaiError
                      ? "Некорректный email\n"
                      : ""
                  }`}
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
                  value={password.value}
                  onChange={(e) => password.onChange(e)}
                  onBlur={(e) => password.onBlur(e)}
                  error={
                    (!password.isDirty ? false : true) &&
                    (!password.inputValid ? true : false)
                  }
                  component="pre"
                  helperText={`${
                    password.isDirty && password.isEmpty
                      ? "Поле не может быть пустым\n"
                      : ""
                  }${
                    password.isDirty && password.minLengthError
                      ? "Некорректная длина\n"
                      : ""
                  }${
                    password.isDirty && password.maxLengthError
                      ? "Слишком длинный пароль\n"
                      : ""
                  }`}
                />

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
                  error={
                    (!firstName.inputValid ? true : false) &&
                    (!firstName.isDirty ? false : true)
                  }
                  component="pre"
                  helperText={`${
                    firstName.isDirty && firstName.isEmpty
                      ? "Поле не может быть пустым\n"
                      : ""
                  }${
                    firstName.isDirty && firstName.minLengthError
                      ? "Слишком короткое имя"
                      : ""
                  }`}
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
                  value={lastName.value}
                  onChange={(e) => lastName.onChange(e)}
                  onBlur={(e) => lastName.onBlur(e)}
                  error={
                    (!lastName.inputValid ? true : false) &&
                    (!lastName.isDirty ? false : true)
                  }
                  component="pre"
                  helperText={`${
                    lastName.isDirty && lastName.isEmpty
                      ? "Поле не может быть пустым\n"
                      : ""
                  }${
                    lastName.isDirty && lastName.minLengthError
                      ? "Слишком короткая фамилия"
                      : ""
                  }`}
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
                  value={email.value}
                  onChange={(e) => email.onChange(e)}
                  onBlur={(e) => email.onBlur(e)}
                  error={
                    (!email.inputValid ? true : false) &&
                    (!email.isDirty ? false : true)
                  }
                  component="pre"
                  helperText={`${
                    email.isDirty && email.isEmpty
                      ? "Поле не может быть пустым\n"
                      : ""
                  }${
                    email.isDirty && email.minLengthError
                      ? "Некорректная длина\n"
                      : ""
                  }${
                    email.isDirty && email.emaiError
                      ? "Некорректный email\n"
                      : ""
                  }`}
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
                  value={role.value}
                  onChange={(e) => role.onChange(e)}
                  onBlur={(e) => role.onBlur(e)}
                  error={
                    (!role.inputValid ? true : false) &&
                    (!role.isDirty ? false : true)
                  }
                  component="pre"
                  helperText={`${
                    role.isDirty && role.isEmpty
                      ? "Поле не может быть пустым\n"
                      : ""
                  }`}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
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
                  value={password.value}
                  onChange={(e) => password.onChange(e)}
                  onBlur={(e) => password.onBlur(e)}
                  error={
                    (!password.isDirty ? false : true) &&
                    (!password.inputValid ? true : false)
                  }
                  component="pre"
                  helperText={`${
                    password.isDirty && password.isEmpty
                      ? "Поле не может быть пустым\n"
                      : ""
                  }${
                    password.isDirty && password.minLengthError
                      ? "Некорректная длина\n"
                      : ""
                  }${
                    password.isDirty && password.maxLengthError
                      ? "Слишком длинный пароль\n"
                      : ""
                  }`}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Повторите пароль"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={
                    (confirmPassword !== password.value ? true : false) &&
                    (confirmPassword.isDirty ? false : true)
                  }
                  component="pre"
                  helperText={`${
                    password.value !== confirmPassword
                      ? "Пароли должны совпадать"
                      : ""
                  }`}
                />
                {password.value !== confirmPassword && (
                  <div style={{ color: "red" }}>Пароли должны совпадать</div>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={click}
                  style={{ marginTop: 15 }}
                  disabled={
                    !email.inputValid ||
                    !password.inputValid ||
                    !firstName.inputValid ||
                    !lastName.inputValid ||
                    !role.inputValid ||
                    password.value !== confirmPassword
                  }
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
