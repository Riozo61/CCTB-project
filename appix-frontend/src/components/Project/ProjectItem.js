import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListItem } from "@mui/material";
import { PROJECT_PAGE_ROUTE } from "../../utils/consts";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";

const ProjectItem = observer(({ project }) => {
  const history = useHistory();
  return (
    <div>
    <ListItem>
    <ListItemButton
      onClick={() => history.push(PROJECT_PAGE_ROUTE + "/" + project.id)}
    >
      <ListItemText primary={project.projectName} secondary="Название проекта" />
      <ListItemText primary={project.contract} secondary="Номер договора" />
      <ListItemText primary={project.status} secondary="Статус" />
      <ListItemText primary={project.estimation} secondary="Расчет" />
      <ListItemText primary={project.currency} secondary="Валюта" />
      <ListItemText primary={project.file} secondary="Файл" />
      <ListItemText primary={project.dateStart} secondary="Начало работ" />
      <ListItemText primary={project.dateEnd} secondary="Конец работ" />
      <ListItemText primary={project.projManager} secondary="Руководитель проекта" />
      <ListItemText primary={project.customer} secondary="Заказчик" />
      <ListItemText primary={project.customerName} secondary="Имя заказчика" />
      <ListItemText primary={project.payment} secondary="Способ оплаты" />


      
    </ListItemButton>
    </ListItem>
    <Divider/>
    </div>
  );
});

export default ProjectItem;
