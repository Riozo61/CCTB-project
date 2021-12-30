import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListItem } from "@mui/material";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";

const TeamItem = observer(({ member }) => {
  return (
    <div>
      <ListItem>
        <ListItemButton>
          <ListItemText primary={member.firstName} secondary="Имя" />
          <ListItemText primary={member.lastName} secondary="Фамилия" />
          <ListItemText primary={member.role} secondary="Роль" />
          <ListItemText primary={member.phone} secondary="Номер Телефона" />
          <ListItemText primary={member.salary} secondary="Зарплата" />
          <ListItemText primary={member.type} secondary="Роль в команде" />
          <ListItemText primary={member.email} secondary="email" />
        </ListItemButton>
      </ListItem>
      <Divider />
    </div>
  );
});
export default TeamItem;
