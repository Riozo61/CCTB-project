import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { NEW_MATERIAL_ROUTE } from "../../utils/consts";

const MaterialButtons = ({className}) => {
  const history = useHistory();
  return (
    <Button
      className={className}
      variant="contained"
      color="success"
      onClick={() => history.push(NEW_MATERIAL_ROUTE)}
    >
      Добавить
    </Button>
  );
};

export default MaterialButtons;
