import React, { useContext } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import useInput from "../Validations/Hooks/useInput";
import { Container, MenuItem, TextField } from "@mui/material";
import { createNewEmployee } from "../../http/axios/teamAPI";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import useInputPhone from "../Validations/Hooks/useInputPhone";
import MuiPhoneNumber from "material-ui-phone-number";
import popoverStyles from "./PopoverStyles";
import { Typography } from "@material-ui/core";

const ProjectPopover = observer(() => {
  const { member } = useContext(Context);
  const classes = popoverStyles(Context);
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const firstName = useInput("", {
    isEmpty: true,
    minLength: 1,
  });
  const lastName = useInput("", { isEmpty: true, minLength: 1 });
  const role = useInput("", { isEmpty: true, minLength: 1 });
  const type = "Сотрудник";
  const phone = useInputPhone("", { isEmpty: true });
  const salary = useInput("", {
    isEmpty: true,
    minValue: 0,
  });
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const click = async () => {
    try {
      let data;
      data = await createNewEmployee(
        email.value,
        firstName.value,
        lastName.value,
        role.value,
        phone.value,
        salary.value,
        type,
        currency.value
      );
      member.addMember({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        role: role.value,
        phone: phone.value,
        salary: salary.value,
        type: type,
        currency: currency.value,
      });
      if (data) {
        handleClose();
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
        Создать
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Container className={classes.container}>
          <Typography variant="h5">Создание нового сотрудника</Typography>
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
              role.isDirty && role.isEmpty ? "Поле не может быть пустым" : ""
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
            }${email.isDirty && email.emaiError ? "Некорректный email\n" : ""}`}
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
              phone.isDirty && phone.isEmpty ? "Поле не может быть пустым" : ""
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
            autoComplete="status"
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
                ? "Поле не может быть пустым"
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
              !currency.inputValid
            }
          >
            Добавить
          </Button>
        </Container>
      </Popover>
    </div>
  );
});
export default ProjectPopover;
