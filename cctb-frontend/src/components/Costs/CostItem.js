import { Divider, ListItem, ListItemText } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'

const CostItem = observer(({cost}) => {
  return (
    <div>
          <ListItem>
      <ListItemText primary={cost.type} secondary="Тип расходов" />
      <ListItemText primary={cost.estimation} secondary="Расчет" />
      <ListItemText primary={cost.description} secondary="Описание" />
    </ListItem>
    <Divider/>

    </div>
  )
})

export default CostItem
