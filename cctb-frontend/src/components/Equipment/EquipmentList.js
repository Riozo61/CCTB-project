import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite'
import React from 'react'

const columns = [
  { field: 'brand', headerName: 'Бренд', width: 300 },
  { field: 'name', headerName: 'Название', width: 300 },
  {
    field: 'typeObj',
    headerName: 'Тип',
    width: 300,
  },
  {
    field: 'serialNumber',
    headerName: 'Серийный номер',
    width: 300,
  },
];



const EquipmentList = observer(({equipments}) => {
  const rows =  [];
  equipments.map((eq) => {
    rows.push(eq)
  })
  return (
    <div style={{ height: 500, width: '100%', marginTop: 100}}>
    <h2>Список оборудования</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
  );

})

export default EquipmentList
