import { List } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import OrderButtons from '../../components/OrderButtons/OrderButtons'
import OrderList from '../../components/OrderList/OrderList'

const ProjectPage = observer(() => {
  return (
    <List>
      <OrderButtons/>
      <OrderList/>
    </List>
  )
}
)

export default ProjectPage
