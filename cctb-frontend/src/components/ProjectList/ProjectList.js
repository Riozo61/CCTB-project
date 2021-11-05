import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../index';
import { useHistory } from 'react-router';
import ProjectItem from './ProjectItem';


const ProjectList = observer( () => {
  const { project } = useContext(Context);
  const history = useHistory();
  console.log(history)

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
