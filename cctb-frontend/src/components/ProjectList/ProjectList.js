import { observer } from "mobx-react-lite";
import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectList = observer(({projects}) => {
  return (
    <div>
      {projects.map((proj) => (
        <ProjectItem key={proj.id} project={proj} />
        
      ))}
    </div>
  );
});

export default ProjectList;
