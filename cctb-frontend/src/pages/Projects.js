import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Divider } from "@mui/material";

const Projects = observer(() => {
  const { site } = useContext(Context);
  return (
    <List>
      {site.constrSite.map((s) => (
        <div key={s.id}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={s.name} secondary={s.address} />
          </ListItemButton>
        </ListItem>
        <Divider/>
        </div>
      ))}
    </List>
  );
});

export default Projects;
