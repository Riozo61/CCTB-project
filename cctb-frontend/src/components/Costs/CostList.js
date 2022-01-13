import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import React from "react";

const columns = [
  { field: "type", headerName: "Тип", width: 300 },
  { field: "estimation", headerName: "Расчет", width: 300 },
  { field: "description", headerName: "Описание", width: 300 },
  { field: "currency", headerName: "Валюта", width: 300 },
  { field: "project", headerName: "Проект", width: 300 },
];

const CostList = observer(({ costs, project }) => {
  const rows = [];
  const projectArray = [];
  costs.forEach((cost) => {
    rows.push(cost);
  });

  if (project[0]) {
    project.forEach((element) => {
      if (
        element.projectName ===
        rows.forEach((el) => {
          return el.project;
        })
      ) {
        projectArray.push(element);
      }
    });
  }

  return (
    <div>
      <h2>Список затрат</h2>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
        />
      </div>
    </div>
  );
});

export default CostList;
