import { Checkbox, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router';
import { ORDERPAGE_ROUTE } from '../../utils/consts';

const OrderItem = (order) => {
  const history = useHistory();
  return (
    <div>
    <ListItem>
    <ListItemButton
      onClick={() => history.push(ORDERPAGE_ROUTE + "/" + order.id)}
    >
      <Checkbox checked={order.checked} />
      <ListItemText primary={order.name} secondary="Заявка" />
      <ListItemText primary={order.type} secondary="Тип" />   
    </ListItemButton>
    </ListItem>
    <Divider/>
    </div>
  );
}

export default OrderItem
