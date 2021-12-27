import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListItem } from "@mui/material";
import { observer } from "mobx-react-lite";

const EquipmentItem = observer(({equipment}) => {
  return (
    <div>
      <ListItem>
    <ListItemButton>
      <ListItemText primary={equipment.type} secondary="Тип" />
      <ListItemText primary={equipment.brand} secondary="Поставщик" />
      <ListItemText primary={equipment.name} secondary="Название" />
      <ListItemText primary={equipment.typeObj} secondary="Ед.измерения" />
      <ListItemText primary={equipment.serialNumber} secondary="Название магазина" />

      
    </ListItemButton>
    </ListItem>
    <Divider/>
    </div>
  )
})
export default EquipmentItem
