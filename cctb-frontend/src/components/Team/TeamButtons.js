import React from "react";
import Button from "@mui/material/Button";
import { NEW_MEMBER_ROUTE } from "../../utils/consts";
import { useHistory } from "react-router-dom";


const TeamButtons = () => {
  const history = useHistory();

  return (
        <Button
          style={{
            textDecoration: "none",
            color: "white",
            borderRadius: 5,
            background: "green",
            marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          padding: 5
          }}
          variant="contained"
          color="success"
          onClick={() => history.push(NEW_MEMBER_ROUTE)}
        >
          Добавить
        </Button>

  );
};

export default TeamButtons;
