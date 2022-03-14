import { List } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import OrderButtons from '../../components/Order/OrderButtons'
import ProjectInfo from '../../components/Project/ProjectInfo'

const ProjectPage = observer(() => {
  return (
    <List>
      <OrderButtons/>
      <ProjectInfo/>
    </List>
  )
}
)

export default ProjectPage
