import { Checkbox, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useHistory } from 'react-router';
import { ORDERPAGE_ROUTE } from '../../utils/consts';

const OrderItem = observer(({order}) => {
  const history = useHistory();
  return (
    <div>
    <ListItem>
    <ListItemButton
      onClick={() => history.push(ORDERPAGE_ROUTE + "/" + order.id)}
    >
      <ListItemText primary={order.orderName} secondary="Название заявки" />
      <ListItemText primary={order.supplier} secondary="Поставщик" />
      <ListItemText primary={order.project} secondary="Проект" />   
      <ListItemText primary={order.measure} secondary="Ед.измерения" />   
      <ListItemText primary={order.photo} secondary="Фото" />   
      <ListItemText primary={order.shopName} secondary="Название магазина" />
      <ListItemText primary={order.brand} secondary="Бренд" />   
      <ListItemText primary={order.quantity} secondary="Количество" />   
    </ListItemButton>
    </ListItem>
    <Divider/>
    </div>
  );
})

export default OrderItem
