import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

const Orders = observer(() => {
  const {area} = useContext(Context);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "Имя заказчика", width: 200 },
    { field: "lastName", headerName: "Фамилия заказчика", width: 200 },
    { field: "constrSite", headerName: "Объект", width: 200 },
    { field: "address", headerName: "Адрес объекта", width: 200 },
  
    {
      field: "fullName",
      headerName: "ФИО",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${
          params.getValue(params.id, "lastName") || ""
        }`,
    },
  ];
  const rows = [
    { id: 1, lastName: "Иванов", firstName: "Иван" },//constrSite: area.name, address: area.address},
    { id: 2, lastName: "Александров", firstName: "Алесандр"}, //constrSite: area.name, address: area.address},
    { id: 3, lastName: "Сергеев", firstName: "Сергей"}, //constrSite: area.name, address: area.address},
    { id: 4, lastName: "Николаев", firstName: "Николай"}, //constrSite: area.name, address: area.address},
  ];
  return ( 
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid

        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    
    </div>
  );
});

export default Orders;