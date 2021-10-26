import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Divider } from "@mui/material";
import AppButtons from "../components/ProjectButtons/buttons";
import { Checkbox } from "@mui/material";

const Projects = observer(() => {
  const { project } = useContext(Context);
  return (
    <List>
    <AppButtons/>
      {project.project.map((p) => (
        <div key={p.id}>
        <ListItem disablePadding>
          <ListItemButton>
          <Checkbox checked={p.checked} />
            <ListItemText primary={p.nameProject} secondary='Название проекта' />
            <ListItemText primary={p.customer} secondary='Заказчик'/>
            <ListItemText primary={p.place} secondary='Объект'/>
            <ListItemText primary={p.timeline} secondary='Сроки' />
            <ListItemText primary={p.estimation} secondary='Расчет'/>
          </ListItemButton>
        </ListItem>
        <Divider/>
        </div>
      ))}
    </List>
  );
});

export default Projects;
