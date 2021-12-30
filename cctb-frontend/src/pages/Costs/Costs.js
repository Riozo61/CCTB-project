import { List } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Context } from '../..'
import CostList from '../../components/Costs/CostList'
import CostsButtons from '../../components/Costs/CostsButtons'
import { getCosts } from '../../http/axios/costsAPI'

const Costs = observer(() => {
  const {cost} = useContext(Context)
  useEffect(() => {
    getCosts().then(data => {cost.setCost(data.rows)})
  }, [])
  return (
    <List>
      <CostsButtons/>
      {cost.cost?.[0] && <CostList costs={cost.cost}/>}
    </List>
  )
})

export default Costs
