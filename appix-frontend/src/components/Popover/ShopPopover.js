import React, { useContext } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import useInput from "../Validations/Hooks/useInput";
import { Container, TextField } from "@mui/material";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import popoverStyles from "./PopoverStyles";
import { Typography } from "@material-ui/core";
import { createNewShop } from "../../http/axios/shopAPI";

const ShopPopover = observer(() => {
  const { shop } = useContext(Context);
  const classes = popoverStyles(Context);
  const shopName = useInput("", {
    isEmpty: true,
    minLength: 1,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const click = async () => {
    try {
      let data;
      data = await createNewShop(shopName.value);
      shop.addShop({
        shopName: shopName.value,
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
        Добавить магазин
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
          <Typography variant="h5">Добавление нового магазина</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Название магазина"
            name="shopName"
            value={shopName.value}
            onChange={(e) => shopName.onChange(e)}
            onBlur={(e) => shopName.onBlur(e)}
            error={
              (!shopName.inputValid ? true : false) &&
              (!shopName.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              shopName.isDirty && shopName.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }${
              shopName.isDirty && shopName.minLengthError
                ? "Слишком короткое название"
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
            disabled={!shopName.inputValid}
          >
            Добавить
          </Button>
        </Container>
      </Popover>
    </div>
  );
});
export default ShopPopover;
