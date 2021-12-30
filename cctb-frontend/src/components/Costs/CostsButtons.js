import { Button } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { NEW_COSTS_ROUTE } from '../../utils/consts';


const CostsButtons = () => {
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
          onClick={() => history.push(NEW_COSTS_ROUTE)}
        >
          Добавить затраты
        </Button>
  );
}

export default CostsButtons
