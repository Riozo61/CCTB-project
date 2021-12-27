import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../..'
import CostList from '../../components/Costs/CostList'
import CostsButtons from '../../components/Costs/CostsButtons'

const Costs = observer(() => {
  const {cost} = useContext(Context)
  return (
    <div>
      <CostsButtons/>
      <CostList/>
    </div>
  )
})

export default Costs
