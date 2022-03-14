import React from "react";
import Button from "@mui/material/Button";
import { NEW_MEMBER_ROUTE } from "../../utils/consts";
import { useHistory } from "react-router-dom";

const TeamButtons = ({ className }) => {
  const history = useHistory();

  return (
    <Button
      className={className}
      variant="contained"
      color="success"
      onClick={() => history.push(NEW_MEMBER_ROUTE)}
    >
      Добавить
    </Button>
  );
};

export default TeamButtons;
