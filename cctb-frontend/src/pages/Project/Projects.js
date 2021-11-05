import List from "@mui/material/List";
import React from "react";
import { observer } from "mobx-react-lite";
import AppButtons from "../../components/ProjectButtons/buttons";
import ProjectList from "../../components/ProjectList/ProjectList";


const Projects = observer(() => {
  return (
    <List>
    <AppButtons/>
    <ProjectList/>
    </List>
  );
});

export default Projects;
