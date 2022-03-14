import React, { useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { getProjects } from "../../http/axios/projectAPI";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  div: {
    marginBottom: 50,
    height: 800,
    width: "100%",
  },
}));

const columns = [
  { field: "projectName", headerName: "Название проекта", width: 200 },
  { field: "contract", headerName: "Номер договора", width: 190 },
  { field: "status", headerName: "Статус", width: 130 },
  {
    field: "estimation",
    headerName: "Расчет",
    width: 150,
  },
  {
    field: "currency",
    headerName: "Валюта",
    width: 150,
  },
  { field: "file", headerName: "Файл", width: 150 },
  { field: "dateStart", headerName: "Начало работ", width: 150 },
  { field: "dateEnd", headerName: "Конец работ", width: 150 },
  { field: "projManager", headerName: "Руководитель проекта", width: 200 },
  { field: "customer", headerName: "Заказчик", width: 150 },
  { field: "customerName", headerName: "Имя заказчика", width: 150 },
  { field: "payment", headerName: "Способ оплаты", width: 150 },
];

const ProjectList = observer(() => {
  const classes = useStyles();
  const { project } = useContext(Context);
  useEffect(() => {
    getProjects().then((data) => {
      project.setProject(data.rows);
    });
  }, []);
  const rows = [];
  if (project.project[0]) {
    project.project.forEach((proj) => {
      rows.push(proj);
    });
  }

  return (
    <div className={classes.div}>
      <DataGrid
        disableColumnMenu={"true"}
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
  );
});
export default ProjectList;
