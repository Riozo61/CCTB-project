import React, { useContext } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import useInput from "../Validations/Hooks/useInput";
import { Container, TextField } from "@mui/material";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { createNewBrand } from "../../http/axios/brandAPI";

const BrandPopover = observer(() => {
  const { brand } = useContext(Context);
  const brandName = useInput("", {
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
      data = await createNewBrand(
        brandName.value,
      );
      brand.addBrand({
        brandName: brandName.value,
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
        Добавить бренд
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
          <h2>Добавление нового бренда</h2>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Имя"
            name="firstName"
            autoComplete="firstName"
            value={brandName.value}
            onChange={(e) => brandName.onChange(e)}
            onBlur={(e) => brandName.onBlur(e)}
          />
          {brandName.isDirty && brandName.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {brandName.isDirty && brandName.minLengthError && (
            <div style={{ color: "red" }}>Слишком короткое название</div>
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
              !brandName.inputValid 
            }
          >
            Добавить
          </Button>
        </Container>
      </Popover>
    </div>
  );
});
export default BrandPopover;
