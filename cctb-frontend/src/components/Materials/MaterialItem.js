import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListItem } from "@mui/material";
import { PROJECT_PAGE_ROUTE } from "../../utils/consts";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";
const MaterialItem = observer(({material}) => {
  const history = useHistory();
  return (
    <div>
      <ListItem>
    <ListItemButton
      onClick={() => history.push(PROJECT_PAGE_ROUTE + "/" + material.id)}
    >
      <ListItemText primary={material.type} secondary="Тип" />
      <ListItemText primary={material.supplier} secondary="Поставщик" />
      <ListItemText primary={material.name} secondary="Название" />
      <ListItemText primary={material.measure} secondary="Ед.измерения" />
      <ListItemText primary={material.shopName} secondary="Название магазина" />
      <ListItemText primary={material.quantity} secondary="Количество" />

      
    </ListItemButton>
    </ListItem>
    <Divider/>
    </div>
  )
}
)
export default MaterialItem
