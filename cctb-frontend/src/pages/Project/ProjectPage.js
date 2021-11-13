import { List } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import OrderButtons from '../../components/OrderButtons/OrderButtons'
import OrderList from '../../components/OrderList/OrderList'
import ProjectInfo from '../../components/ProjectList/ProjectInfo'

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
