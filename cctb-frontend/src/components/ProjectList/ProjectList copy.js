import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';

const columns = [
  { field: 'projectName', headerName: 'Название проекта', width: 70 },
  { field: 'contract', headerName: 'Номер договора', width: 130 },
  { field: 'status', headerName: 'Статус', width: 130 },
  {
    field: 'estimation',
    headerName: 'Расчет',
    width: 90,
  },
  {
    field: 'currency',
    headerName: 'Валюта',
    width: 50,
  },
  { field: 'file', headerName: 'Файл', width: 40 },
  { field: 'dateStart', headerName: 'Начало работ', width: 130},
  { field: 'dateEnd', headerName: 'Конец работ', width: 130},
  { field: 'projManager', headerName: 'Руководитель проекта', width: 130},
  { field: 'customer', headerName: 'Заказчик', width: 130},
  { field: 'customerName', headerName: 'Имя заказчика', width: 130},
  { field: 'payment', headerName: 'Способ оплаты', width: 130},

];

const rows = [

];

const ProjectList = ({projects}) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid

        rows={projects}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
      )
    </div>
  );
}
export default ProjectList;
