import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Checkbox, Divider, ListItem } from "@mui/material";
import { PROJECT_PAGE_ROUTE } from "../../utils/consts";
import { useHistory } from "react-router";

const ProjectItem = ({ project }) => {
  const history = useHistory();
  return (
    <div>
    <ListItem>
    <ListItemButton
      onClick={() => history.push(PROJECT_PAGE_ROUTE + "/" + project.id)}
    >
      <Checkbox checked={project.checked} />
      <ListItemText primary={project.nameProject} secondary="Название проекта" />
      <ListItemText primary={project.customer} secondary="Заказчик" />
      <ListItemText primary={project.address} secondary="Объект" />
      <ListItemText primary={project.timeline} secondary="Сроки" />
      <ListItemText primary={project.estimation} secondary="Расчет" />
      
    </ListItemButton>
    </ListItem>
    <Divider/>
    </div>
  );
};

export default ProjectItem;
