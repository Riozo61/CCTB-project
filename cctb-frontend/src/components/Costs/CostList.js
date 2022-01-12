import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite'
import React from 'react'


const columns = [
  { field: 'type', headerName: 'Тип', width: 200 },
  { field: 'estimation', headerName: 'Расчет', width: 190 },
  { field: 'description', headerName: 'Описание', width: 130 },
];


const CostList = observer(({costs}) => {
  const rows =  [];
  const projects = [];
  if (costs.cost.projectName[0]){
    costs.cost.projectName.forEach((element) => {
      projects.push(element)
    })
  }
  costs.forEach((cost) => {
    rows.push(cost)
  })
  return (
    <div style={{ height: 500, width: '100%' }}>
    <h2>Список затрат</h2>
    {projects?.[0] && 
    <h3>{projects}</h3>
    }
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
  )

})

export default CostList
