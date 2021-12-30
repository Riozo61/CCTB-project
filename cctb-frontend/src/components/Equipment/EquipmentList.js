import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite'
import React from 'react'
import EquipmentItem from './EquipmentItem'

const columns = [
  { field: 'type', headerName: 'Тип', width: 200 },
  { field: 'brand', headerName: 'Поставщик', width: 190 },
  { field: 'name', headerName: 'Название', width: 130 },
  {
    field: 'typeObj',
    headerName: 'Ед.измерения',
    width: 150,
  },
  {
    field: 'serialNumber',
    headerName: 'Название магазина',
    width: 150,
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
