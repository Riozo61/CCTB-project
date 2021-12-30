import { Button, Stack } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { NEW_COSTS_ROUTE } from '../../utils/consts';

const CostsButtons = () => {
  return (
  <div>
  <Stack direction="row" spacing={2} style={{marginLeft: 20, marginTop: 20}}>
    <div style={{ marginBottom: 40 }}>
      <Button
        variant="contained"
        color="success"
      >
      <NavLink to={NEW_COSTS_ROUTE} style={{textDecoration: 'none', color: 'white'}}>
        Добавить затраты
      </NavLink>
      </Button>
    </div>
  </Stack>
  </div>
);
}

export default CostsButtons
