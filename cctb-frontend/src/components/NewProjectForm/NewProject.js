import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../..";

const NewProject = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Название проекта"
        variant="outlined"
        margin='normal'
      />
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Владелец"
        variant="outlined"
        margin='normal'
      />
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Заказчик"
        variant="outlined"
        margin='normal'
      />
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Адрес"
        variant="outlined"
        margin='normal'
      />
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Сроки"
        variant="outlined"
        margin='normal'
      />
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Расчет"
        variant="outlined"
        margin='normal'
      />
      <Button
      variant="contained"
          onClick={handleClick}
          color="success"
      >
      Добавить новый проект</Button>
    </div>
  );
};
export default NewProject;
