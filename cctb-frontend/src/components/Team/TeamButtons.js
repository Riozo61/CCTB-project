import React from "react";
import Button from "@mui/material/Button";
import { NEW_MEMBER_ROUTE} from "../../utils/consts";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

const TeamButtons = () => {


  return (
    <div>
    <Stack direction="row" spacing={2} style={{marginLeft: 20}}>
      <div style={{ marginBottom: 40 }}>
        <Button
          variant="contained"
          color="success"
        >
        <NavLink to={NEW_MEMBER_ROUTE} style={{textDecoration: 'none', color: 'white'}}>
          Добавить
        </NavLink>
        </Button>
      </div>
    </Stack>
    </div>
  );
};

export default TeamButtons;
