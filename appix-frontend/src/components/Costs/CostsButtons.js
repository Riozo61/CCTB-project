import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { NEW_COSTS_ROUTE } from "../../utils/consts";

const CostsButtons = ({ className }) => {
  const history = useHistory();
  return (
    <Button
      className={className}
      variant="contained"
      color="success"
      onClick={() => history.push(NEW_COSTS_ROUTE)}
    >
      Добавить затраты
    </Button>
  );
};

export default CostsButtons;
