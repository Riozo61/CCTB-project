import * as yup from "yup";

const validationsForm = {
  firstName: yup.string().required("Поле обязательно для заполнения"),
  lastName: yup.string().required("Поле обязательно для заполнения"),
  email: yup
    .string()
    .email("Введите верный e-mail")
    .required("Поле обязательно для заполнения"),
  role: yup.string().required("Выберите роль"),
  password: yup
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .required("Введите пароль"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароль должен совпадать")
    .required("Поле обязательно для заполнения"),
};

export default validationsForm;
