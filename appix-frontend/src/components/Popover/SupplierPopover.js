import React, { useContext } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import useInput from "../Validations/Hooks/useInput";
import { Container, TextField, Typography } from "@mui/material";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import useInputPhone from "../Validations/Hooks/useInputPhone";
import MuiPhoneNumber from "material-ui-phone-number";
import { createNewPartnerMember } from "../../http/axios/partnerAPI";
import popoverStyles from "./PopoverStyles";

const SupplierPopover = observer(() => {
  const classes = popoverStyles(Context);
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
        <Container className={classes.container}>
          <Typography variant="h5">Создание нового поставщика</Typography>
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
