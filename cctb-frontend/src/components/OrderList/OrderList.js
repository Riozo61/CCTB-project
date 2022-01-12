import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import React from 'react';


const columns = [
  { field: 'orderName', headerName: 'Название заявки', width: 200 },
  { field: 'supplier', headerName: 'Поставщик', width: 190 },
  { field: 'project', headerName: 'Проект', width: 130 },
  {
    field: 'measure',
    headerName: 'Ед.измерения',
    width: 150,
  },
  {
    field: 'photo',
    headerName: 'Фото',
    width: 150,
  },
  { field: 'shopName', headerName: 'Название магазина', width: 150 },
  { field: 'brand', headerName: 'Бренд', width: 150},
  { field: 'quantity', headerName: 'Количество', width: 150},

];


const OrderList = observer( ({orders}) => {
  const rows = [];
  orders.map((order) => {
    rows.push(order)
  })

  return (

    <div style={{ height: 800, width: '70%' }}>
    <h2>Список Заявок</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>

  )
}
)


export default OrderList
