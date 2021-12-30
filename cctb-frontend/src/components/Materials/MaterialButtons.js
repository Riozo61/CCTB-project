import { Button, Stack } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { NEW_MATERIAL_ROUTE} from '../../utils/consts';

const MaterialButtons = () => {
  return (
  <div>
  <Stack direction="row" spacing={2} style={{marginLeft: 20}}>
    <div style={{ marginBottom: 40 }}>
      <Button
        variant="contained"
        color="success"
      >
      <NavLink to={NEW_MATERIAL_ROUTE} style={{textDecoration: 'none', color: 'white'}}>
        Добавить материал/оборудование
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
        Удалить материал/оборудование
      </Button>
    </div>
  </Stack>
  </div>
);
};

export default MaterialButtons