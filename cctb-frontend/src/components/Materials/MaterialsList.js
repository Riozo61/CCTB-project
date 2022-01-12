import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite'
import React from 'react'
const columns = [
  { field: 'type', headerName: 'Тип', width: 200 },
  { field: 'supplier', headerName: 'Поставщик', width: 190 },
  { field: 'name', headerName: 'Название', width: 130 },
  {
    field: 'measure',
    headerName: 'Ед.измерения',
    width: 150,
  },
  {
    field: 'shopName',
    headerName: 'Название магазина',
    width: 150,
  },
  { field: 'quantity', headerName: 'Количество', width: 150 },
];


const MaterialsList = observer(({materials}) => {
  const rows =  [];
  materials.map((mat) => {
    rows.push(mat)
  })
  return (
    <div style={{ height: 500, width: '100%' }}>
    <h2>Список материалов</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
  )
})

export default MaterialsList
