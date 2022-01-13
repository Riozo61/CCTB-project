import { List } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Context } from '../..'
import CostList from '../../components/Costs/CostList'
import CostsButtons from '../../components/Costs/CostsButtons'
import { getCosts } from '../../http/axios/costsAPI'
import { getProjects } from '../../http/axios/projectAPI'

const Costs = observer(() => {
  const {cost} = useContext(Context)
  const { project } = useContext(Context);

  useEffect(() => {
    getCosts().then(data => {cost.setCost(data.rows)});
    getProjects().then((data) => {
      project.setProject(data.rows);
    });
  }, [])
  return (
    <List>
      <CostsButtons/>
      {cost.cost?.[0] && <CostList costs={cost.cost} project={project.project}/>}
    </List>
  )
})

export default Costs
