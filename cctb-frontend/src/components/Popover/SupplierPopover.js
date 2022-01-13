import React, { useContext } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import useInput from "../Validations/Hooks/useInput";
import { Container, TextField } from "@mui/material";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import useInputPhone from "../Validations/Hooks/useInputPhone";
import MuiPhoneNumber from "material-ui-phone-number";
import { createNewPartnerMember } from "../../http/axios/partnerAPI";

const SupplierPopover = observer(() => {
  const { partnerMember } = useContext(Context);
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const firstName = useInput("", {
    isEmpty: true,
    minLength: 1,
  });
  const lastName = useInput("", { isEmpty: true, minLength: 1 });
  const type = "Партнер";
  const phone = useInputPhone("", { isEmpty: true });
  const company = useInput("", { isEmpty: true, minLength: 2 });
  const rolePartner = "Поставщик";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const click = async () => {
    try {
      let data;
      data = await createNewPartnerMember(
        email.value,
        firstName.value,
        lastName.value,
        phone.value,
        type,
        company.value,
        rolePartner
      );
      partnerMember.addPartnerMember({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value,
        type: type,
        company: company.value,
        rolePartner: rolePartner,
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
        Добавить поставщика
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
        <Container style={{ marginLeft: "auto", marginRight: "auto" }}>
          <h2>Создание нового поставщика</h2>
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
              !company.inputValid
            }
          >
            Добавить
          </Button>
        </Container>
      </Popover>
    </div>
  );
});
export default SupplierPopover;
