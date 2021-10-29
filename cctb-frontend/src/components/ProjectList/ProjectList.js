import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Context } from '../../';
import { Divider, ListItem } from "@mui/material";
import { Checkbox } from "@mui/material";





const ProjectList = observer( () => {
  const { project } = useContext(Context);


  return (
    <div>
      {project.project.map((p) => (
        <div key={p.id}>
        <ListItem disablePadding>
          <ListItemButton>
          <Checkbox checked={p.checked} />
            <ListItemText primary={p.nameProject} secondary='Название проекта' />
            <ListItemText primary={p.customer} secondary='Заказчик'/>
            <ListItemText primary={p.address} secondary='Объект'/>
            <ListItemText primary={p.timeline} secondary='Сроки' />
            <ListItemText primary={p.estimation} secondary='Расчет'/>
          </ListItemButton>
        </ListItem>
        <Divider/>
        </div>
      ))}
    </div>
  )
}
)

export default ProjectList
