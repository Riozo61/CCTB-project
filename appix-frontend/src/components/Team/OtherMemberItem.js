import { Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

const OtherMemberItem = observer(({ otherMember }) => {
  return (
    <div>
      <ListItem>
        <ListItemButton>
          <ListItemText primary={otherMember.firstName} secondary="Имя" />
          <ListItemText primary={otherMember.lastName} secondary="Фамилия" />
          <ListItemText
            primary={otherMember.phone}
            secondary="Номер Телефона"
          />
          <ListItemText primary={otherMember.type} secondary="Роль в команде" />
          <ListItemText primary={otherMember.email} secondary="email" />
        </ListItemButton>
      </ListItem>
      <Divider />
    </div>
  );
});

export default OtherMemberItem;
