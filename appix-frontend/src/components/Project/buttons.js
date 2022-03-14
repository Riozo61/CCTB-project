import React from "react";
import Button from "@mui/material/Button";
import { NEW_PROJECT_ROUTE } from "../../utils/consts";
import { useHistory } from "react-router-dom";

const AppButtons = ({ className }) => {
  const history = useHistory();

  return (
    <Button
      className={className}
      variant="contained"
      color="success"
      onClick={() => history.push(NEW_PROJECT_ROUTE)}
    >
      Создать проект
    </Button>
  );
};

export default AppButtons;
