import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';

const columns = [
  { field: 'projectName', headerName: 'Название проекта', width: 200 },
  { field: 'contract', headerName: 'Номер договора', width: 190 },
  { field: 'status', headerName: 'Статус', width: 130 },
  {
    field: 'estimation',
    headerName: 'Расчет',
    width: 150,
  },
  {
    field: 'currency',
    headerName: 'Валюта',
    width: 150,
  },
  { field: 'file', headerName: 'Файл', width: 150 },
  { field: 'dateStart', headerName: 'Начало работ', width: 150},
  { field: 'dateEnd', headerName: 'Конец работ', width: 150},
  { field: 'projManager', headerName: 'Руководитель проекта', width: 200},
  { field: 'customer', headerName: 'Заказчик', width: 150},
  { field: 'customerName', headerName: 'Имя заказчика', width: 150},
  { field: 'payment', headerName: 'Способ оплаты', width: 150},

];



const ProjectList = observer(({projects}) => {
  const rows =  [];
  projects.map((proj) => {
    rows.push(proj)
  })
  return (
    <div style={{ height: 800, width: '100%' }}>
    <h2>Список проектов</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
  );
})
export default ProjectList;
