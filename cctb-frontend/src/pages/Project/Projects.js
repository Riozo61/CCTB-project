import List from "@mui/material/List";
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import AppButtons from "../../components/ProjectButtons/buttons";
import ProjectList from "../../components/ProjectList/ProjectList";
import { getProjects } from "../../http/axios/projectAPI";
import { Context } from "../..";


const Projects = observer(() => {
  const {project} = useContext(Context)
  useEffect(() => {
    getProjects().then(data => {project.setProject(data.rows)});
  }, [])
  
  return (
    <List>
    <AppButtons/>
    {project.project?.[0] && <ProjectList projects={project.project}/>}
    
    </List>
  );
});

export default Projects;
