import { Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../..";
import { createNewPartnerMember } from "../../http/axios/partnerAPI";
import { createNewEmployee, createOtherMember } from "../../http/axios/teamAPI";
import { TEAM_ROUTE } from "../../utils/consts";
import useInput from "../Validations/Hooks/useInput";
import MuiPhoneNumber from "material-ui-phone-number";
import useInputPhone from "../Validations/Hooks/useInputPhone";

const NewMember = observer(() => {
  const { member } = useContext(Context);
  const { otherMember } = useContext(Context);
  const { partnerMember } = useContext(Context);
  const history = useHistory();

  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const firstName = useInput("", {
    isEmpty: true,
    minLength: 1,
  });
  const lastName = useInput("", { isEmpty: true, minLength: 1 });
  const role = useInput("", { isEmpty: true, minLength: 1 });
  const type = useInput("", { isEmpty: true, minLength: 1 });
  const phone = useInputPhone("", { isEmpty: true });
  const company = useInput("", { isEmpty: true, minLength: 2 });
  const salary = useInput("", {
    isEmpty: true,
    minValue: 0,
  });
  const rolePartner = useInput("", { isEmpty: true });
  const currency = useInput("", { isEmpty: true });
  const currencies = [
    { value: "$", label: "$" },
    { value: "€", label: "€" },
    { value: "₽", label: "₽" },
  ];
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
  ];
  const partner = [
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
          type.value,
          currency.value
        );
        member.setMember({
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          role: role.value,
          phone: phone.value,
          salary: salary.value,
          type: type.value,
          currency: currency.value,
        });
      } else if (type.value === "Партнер") {
        data = await createNewPartnerMember(
          email.value,
          firstName.value,
          lastName.value,
          phone.value,
          type.value,
          company.value,
          rolePartner.value
        );
        partnerMember.setPartnerMember({
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          type: type.value,
          company: company.value,
          rolePartner: rolePartner.value,
        });
      } else {
        data = await createOtherMember(
          email.value,
          firstName.value,
          lastName.value,
          phone.value,
          type.value,
          company.value
        );
        otherMember.setOtherMember({
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          type: type.value,
          company: company.value,
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
    <Container style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20, marginBottom: 20, maxWidth: 800 }}>
      <Typography variant="h5">Добавление нового участника команды</Typography>

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
        error={
          (!type.inputValid ? true : false) && (!type.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          type.isDirty && type.isEmpty ? "Поле не может быть пустым\n" : ""
        }`}
      >
        {types.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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
            select
            fullWidth
            id="outlined-select-currency"
            label="Роль"
            name="role"
            value={role.value}
            onChange={(e) => role.onChange(e)}
            onBlur={(e) => role.onBlur(e)}
            error={
              (!role.inputValid ? true : false) &&
              (!role.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              role.isDirty && role.isEmpty ? "Поле не может быть пустым\n" : ""
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
            id="email"
            label="Электронная почта"
            name="email"
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
              email.isDirty && email.minLengthError ? "Некорректная длина" : ""
            }${email.isDirty && email.emaiError ? "Некорректный email" : ""}`}
          />
          <MuiPhoneNumber
            fullWidth={false}
            id="outlined-basic"
            style={{ marginRight: 10, marginTop: 15 }}
            label="Номер телефона"
            defaultCountry={"ru"}
            variant="outlined"
            required
            value={phone.value}
            onChange={(e) => phone.onChange(e)}
            onBlur={(e) => phone.onBlur(e)}
            error={
              (!phone.inputValid ? true : false) &&
              (!phone.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              phone.isDirty && phone.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }`}
          />

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
            error={
              (!salary.inputValid ? true : false) &&
              (!salary.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              salary.isDirty && salary.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }${
              salary.isDirty && salary.minValueError
                ? "Значение не может быть\nотрицательным или равно 0"
                : ""
            }`}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            select
            style={{ width: 150, marginLeft: 10 }}
            id="outlined-select-currency"
            label="Валюта"
            name="status"
            value={currency.value}
            onChange={(e) => currency.onChange(e)}
            onBlur={(e) => currency.onBlur(e)}
            error={
              (!currency.inputValid ? true : false) &&
              (!currency.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              currency.isDirty && currency.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }`}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

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
              !type.inputValid ||
              !currency.inputValid
            }
          >
            Добавить
          </Button>
        </div>
      ) : type.value === "Партнер" ? (
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Имя"
            name="firstName"
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
            select
            fullWidth
            id="outlined-select-currency"
            label="Роль партнера"
            name="rolePartner"
            value={rolePartner.value}
            onChange={(e) => rolePartner.onChange(e)}
            onBlur={(e) => rolePartner.onBlur(e)}
            error={
              (!rolePartner.inputValid ? true : false) &&
              (!rolePartner.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              rolePartner.isDirty && rolePartner.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }`}
          >
            {partner.map((option) => (
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
            id="email"
            label="Электронная почта"
            name="email"
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
              email.isDirty && email.minLengthError ? "Некорректная длина" : ""
            }${email.isDirty && email.emaiError ? "Некорректный email" : ""}`}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="company"
            label="Название компании"
            name="company"
            value={company.value}
            onChange={(e) => company.onChange(e)}
            onBlur={(e) => company.onBlur(e)}
            error={
              (!company.inputValid ? true : false) &&
              (!company.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              company.isDirty && company.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }${
              company.isDirty && company.minLengthError
                ? "Слишком короткое название компании"
                : ""
            }`}
          />

          <MuiPhoneNumber
            fullWidth={false}
            id="outlined-basic"
            style={{ marginRight: 10, marginTop: 15 }}
            label="Номер телефона"
            defaultCountry={"ru"}
            variant="outlined"
            required
            value={phone.value}
            onChange={(e) => phone.onChange(e)}
            onBlur={(e) => phone.onBlur(e)}
            error={
              (!phone.inputValid ? true : false) &&
              (!phone.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              phone.isDirty && phone.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }`}
          />

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
              !type.inputValid ||
              !rolePartner.inputValid ||
              !company.inputValid
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
              email.isDirty && email.minLengthError ? "Некорректная длина" : ""
            }${email.isDirty && email.emaiError ? "Некорректный email" : ""}`}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="company"
            label="Название компании"
            name="company"
            value={company.value}
            onChange={(e) => company.onChange(e)}
            onBlur={(e) => company.onBlur(e)}
            error={
              (!company.inputValid ? true : false) &&
              (!company.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              company.isDirty && company.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }${
              company.isDirty && company.minLengthError
                ? "Слишком короткое название компании"
                : ""
            }`}
          />

          <MuiPhoneNumber
            fullWidth={false}
            id="outlined-basic"
            style={{ marginRight: 10, marginTop: 15 }}
            label="Номер телефона"
            defaultCountry={"ru"}
            variant="outlined"
            required
            value={phone.value}
            onChange={(e) => phone.onChange(e)}
            onBlur={(e) => phone.onBlur(e)}
            error={
              (!phone.inputValid ? true : false) &&
              (!phone.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              phone.isDirty && phone.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }`}
          />

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
