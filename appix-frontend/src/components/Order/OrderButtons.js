import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { NEW_ORDER_ROUTE } from "../../utils/consts";

const OrderButtons = ({className}) => {
  const history = useHistory();

  return (
    <Button
      className={className}
      variant="contained"
      color="success"
      onClick={() => history.push(NEW_ORDER_ROUTE)}
    >
      Добавить
    </Button>
  );
};

export default OrderButtons;
