import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '../../index';
import { useHistory } from 'react-router';
import ProjectItem from './ProjectItem';
import { getProjects } from '../../http/projectAPI';
import ProjectStore from '../../store/ProjectStore';


const ProjectList = observer( () => {
  const project = new ProjectStore();
  const history = useHistory();
  //useEffect(() => getProjects().then(data => project.setProject(data)))

  return (
    
    <div>
      {project.project.map((proj) => (
          <ProjectItem key={proj.id} project={proj}/>
      ))}
    </div>
  )
}
)

export default ProjectList
