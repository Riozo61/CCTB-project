import { Button, Container, MenuItem, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../..";
import { createNewEmployee, createOtherMember } from "../../http/axios/teamAPI";
import { TEAM_ROUTE } from "../../utils/consts";
import useInput from "../Validations/Hooks/useInput";

const NewMember = observer(() => {
  const { member } = useContext(Context);
  const { otherMember } = useContext(Context);
  const history = useHistory();

  const email = useInput("", { isEmpty: true, minLength: 5, isEmail: true });
  const firstName = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 20,
  });
  const lastName = useInput("", { isEmpty: true, minLength: 2, maxLength: 20 });
  const role = useInput("", { isEmpty: true, minLength: 2 });
  const type = useInput("", { isEmpty: true, minLength: 2 });
  const phone = useInput("", { isEmpty: true, minLength: 9, maxLength: 11 });
  const salary = useInput("", {
    isEmpty: true,
    minValue: 0,
    maxValue: 1000000,
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
  ];

  const types = [
    {
      value: "employee",
      label: "Сотрудник",
    },
    {
      value: "customer",
      label: "Заказчик",
    },
    {
      value: "partner",
      label: "Партнер",
    },
    {
      value: "subcontractor",
      label: "Субподрядчик",
    },
    {
      value: "supplier",
      label: "Поставщик",
    },
  ];
  const click = async () => {
    try {
      let data;
      if (type.value === "Сотрудник") {
        data = await createNewEmployee(
          email.value,
          firstName.value,
          lastName.value,
          role.value,
          phone.value,
          salary.value,
          type.value
        );
        member.setMember({
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          role: role.value,
          phone: phone.value,
          salary: salary.value,
          type: type.value,
        });
      } else {
        data = await createOtherMember(
          email.value,
          firstName.value,
          lastName.value,
          phone.value,
          type.value
        );
        otherMember.setOtherMember({
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          type: type.value,
        });
      }
      if (data) {
        history.push(TEAM_ROUTE);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container style={{ marginLeft: "auto", marginRight: "auto" }}>
      <h2>Добавление нового участника команды</h2>
      <TextField
        variant="outlined"
        margin="normal"
        required
        select
        fullWidth
        id="outlined-select-currency"
        label="Роль"
        name="role"
        value={type.value}
        onChange={(e) => type.onChange(e)}
        onBlur={(e) => type.onBlur(e)}
      >
        {types.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {type.isDirty && type.isEmpty && (
        <div style={{ color: "red" }}>Поле не может быть пустым</div>
      )}
      {type.value === "Сотрудник" ? (
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
            fullWidth={false}
            style={{ marginRight: 10 }}
            id="outlined-basic"
            label="Номер телефона"
            variant="outlined"
            margin="normal"
            type="number"
            required
            value={phone.value}
            onChange={(e) => phone.onChange(e)}
            onBlur={(e) => phone.onBlur(e)}
          />
          {phone.isDirty && phone.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {phone.isDirty && phone.minValueError && (
            <div style={{ color: "red" }}>
              Значение не может быть отрицательным или равно 0
            </div>
          )}
          {phone.isDirty && phone.maxValueError && (
            <div style={{ color: "red" }}>Слишком длинный номер телефона</div>
          )}

          <TextField
            fullWidth={false}
            style={{ marginRight: 10 }}
            id="outlined-basic"
            label="Зарплата"
            variant="outlined"
            margin="normal"
            type="number"
            required
            value={salary.value}
            onChange={(e) => salary.onChange(e)}
            onBlur={(e) => salary.onBlur(e)}
          />
          {salary.isDirty && salary.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {salary.isDirty && salary.minValueError && (
            <div style={{ color: "red" }}>
              Значение не может быть отрицательным или равно 0
            </div>
          )}
          {salary.isDirty && salary.maxValueError && (
            <div style={{ color: "red" }}>Слишком большое значение</div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            className="submit"
            onClick={click}
            style={{ marginTop: 15 }}
            disabled={
              !email.inputValid ||
              !firstName.inputValid ||
              !lastName.inputValid ||
              !phone.inputValid ||
              !salary.inputValid ||
              !type.inputValid
            }
          >
            Добавить
          </Button>
        </div>
      ) : (
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
            fullWidth={false}
            style={{ marginRight: 10 }}
            id="outlined-basic"
            label="Номер телефона"
            variant="outlined"
            margin="normal"
            type="number"
            required
            value={phone.value}
            onChange={(e) => phone.onChange(e)}
            onBlur={(e) => phone.onBlur(e)}
          />
          {phone.isDirty && phone.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {phone.isDirty && phone.minValueError && (
            <div style={{ color: "red" }}>
              Значение не может быть отрицательным или равно 0
            </div>
          )}
          {phone.isDirty && phone.maxValueError && (
            <div style={{ color: "red" }}>Слишком длинный номер телефона</div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            className="submit"
            onClick={click}
            style={{ marginTop: 15 }}
            disabled={
              !email.inputValid ||
              !firstName.inputValid ||
              !lastName.inputValid ||
              !phone.inputValid ||
              !type.inputValid
            }
          >
            Добавить
          </Button>
        </div>
      )}
    </Container>
  );
});

export default NewMember;
