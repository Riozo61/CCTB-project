import React, { useContext } from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import validationsForm from "../validations/validationSchema";
import { withFormik } from "formik";
import * as yup from "yup";
import { Context } from "..";
import { registration } from "../http/userAPI";

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50,
  },
  container: {
    display: "Flex",
    justifyContent: "center",
  },
  actions: {
    float: "right",
  },
});

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
  }
];

const form = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              id="firstName"
              label="Имя"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.firstName ? errors.firstName : ""}
              error={touched.firstName && Boolean(errors.firstName)}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="lastName"
              label="Фамилия"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.lastName ? errors.lastName : ""}
              error={touched.lastName && Boolean(errors.lastName)}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="email"
              label="Электронная почта"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              select
              id="role"
              label="Роль"
              name="role"
              value={values.course}
              onChange={handleChange("course")}
              helperText={touched.course ? errors.course : ""}
              error={touched.course && Boolean(errors.course)}
              margin="normal"
              variant="outlined"
              fullWidth
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="company"
              label="Название компании"
              name="company"
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.company ? errors.company : ""}
              error={touched.company && Boolean(errors.company)}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              label="Пароль"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ""}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              margin="normal"
              variant="outlined"
              fullWidth
            />

          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
            Регистрация
            </Button>
            <Button color="secondary" onClick={handleReset}>
            Очистить поля
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({
    email,
    password,
    role,
    firstName,
    lastName,
    company,
    confirmPassword
  }) => {
    return {
      email: email || "",
      password: password || "",
      role: role || "",
      firstName: firstName || "",
      lastName: lastName || "",
      company: company || "",
      confirmPassword: confirmPassword || ""
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
})(form);

export default withStyles(styles)(Form);
