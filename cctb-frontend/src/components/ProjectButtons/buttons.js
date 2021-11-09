import React from "react";
import Button from "@mui/material/Button";
import { useHistory, useLocation } from "react-router";
import { NEW_PROJECT_ROUTE, PROJECTS_ROUTE } from "../../utils/consts";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

const AppButtons = () => {


  return (
    <div>
    <Stack direction="row" spacing={2}>
      <div style={{ marginBottom: 40 }}>
        <Button
          variant="contained"
          color="success"
        >
        <NavLink to={NEW_PROJECT_ROUTE} style={{textDecoration: 'none', color: 'white'}}>
          Создать проект
        </NavLink>
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => console.log("click")}
          color="error"
          disabled={false}
        >
          Удалить проект
        </Button>
      </div>
    </Stack>
    </div>
  );
};

export default AppButtons;
