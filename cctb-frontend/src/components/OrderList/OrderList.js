import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import React from 'react';


const columns = [
  { field: 'orderName', headerName: 'Название заявки', width: 200 },
  { field: 'supplier', headerName: 'Поставщик', width: 200 },
  { field: 'project', headerName: 'Проект', width: 200 },
  {
    field: 'measure',
    headerName: 'Ед.измерения',
    width: 200,
  },
  {
    field: 'photo',
    headerName: 'Фото',
    width: 200,
  },
  { field: 'shopName', headerName: 'Название магазина', width: 200 },
  { field: 'brand', headerName: 'Бренд', width: 200},
  { field: 'quantity', headerName: 'Количество', width: 200},

];


const OrderList = observer( ({orders}) => {
  const rows = [];
  orders.map((order) => {
    rows.push(order)
  })

  return (

    <div style={{ height: 800, width: '100%' }}>
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
