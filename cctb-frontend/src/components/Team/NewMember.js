import { Button, Container, MenuItem, TextField } from "@mui/material";
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
  const phone = useInputPhone('', {isEmpty: true})
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
        member.addMember({
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
        partnerMember.addPartnerMember({
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
        otherMember.addOtherMember({
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
            value={role.value}
            onChange={(e) => role.onChange(e)}
            onBlur={(e) => role.onBlur(e)}
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.label}>
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
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {((salary.isDirty && salary.isEmpty) ||
            (currency.isDirty && currency.isEmpty) ||
            (phone.isDirty && phone.isEmpty)) && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}

          {(salary.isDirty && salary.minValueError) && (
            <div style={{ color: "red" }}>
              Значение не может быть отрицательным или равно 0
            </div>
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
            label="Роль партнера"
            name="rolePartner"
            value={rolePartner.value}
            onChange={(e) => rolePartner.onChange(e)}
            onBlur={(e) => rolePartner.onBlur(e)}
          >
            {partner.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {rolePartner.isDirty && rolePartner.isEmpty && (
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
            id="company"
            label="Название компании"
            name="company"
            value={company.value}
            onChange={(e) => company.onChange(e)}
            onBlur={(e) => company.onBlur(e)}
          />
          {company.isDirty && company.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {company.isDirty && company.minLengthError && (
            <div style={{ color: "red" }}>
              Слишком короткое название компании
            </div>
          )}

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
            onBlur={(e) => phone.onBlur(e)}          />
          {phone.isDirty && phone.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
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
            id="company"
            label="Название компании"
            name="company"
            value={company.value}
            onChange={(e) => company.onChange(e)}
            onBlur={(e) => company.onBlur(e)}
          />
          {company.isDirty && company.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {company.isDirty && company.minLengthError && (
            <div style={{ color: "red" }}>
              Слишком короткое название компании
            </div>
          )}

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
          />
          {phone.isDirty && phone.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
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
