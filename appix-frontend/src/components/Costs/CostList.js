import { makeStyles, Typography } from "@material-ui/core";
import { Box, Toolbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import React from "react";
import CostsButtons from "./CostsButtons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    textDecoration: "none",
    color: "white",
    borderRadius: theme.spacing(0.5),
    background: "green",
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  header2: {
    flexGrow: 1,
    marginBottom: 25,
    marginLeft: 10,
  },
  toolBar: {
    height: theme.spacing(5),
    marginTop: 15,
  },
  box: {
    margin: 30,
  },
  div: {
    marginBottom: 100,
    height: 400,
    width: "100%",
  },
}));

const columns = [
  { field: "type", headerName: "Тип", width: 300 },
  { field: "estimation", headerName: "Расчет", width: 300 },
  { field: "currency", headerName: "Валюта", width: 300 },
  { field: "description", headerName: "Описание", width: 300 },
  { field: "project", headerName: "Проект", width: 300 },
];

const CostList = observer(({ costs, project }) => {
  const classes = useStyles();
  const rows = [];
  if (costs[0]) {
    costs.forEach((element) => {
      rows.push(element);
    });
  }

  return (
    <>
      <Toolbar className={classes.toolBar}>
        <Typography variant="h4" className={classes.header2}>
          Сводка затрат
        </Typography>
        <CostsButtons className={classes.button} />
      </Toolbar>
      <Box className={classes.box}>
        {project.map((element) => {
          const projectCosts = rows.filter(
            (row) => row.project === element.projectName
          );
          return (
            <div key={element.id}>
              <Typography variant="h5" className={classes.header2}>
                {element.projectName}
              </Typography>
              <div className={classes.div}>
                <DataGrid
                  disableColumnMenu={"true"}
                  getRowId={(row) => row.id}
                  rows={projectCosts}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                />
                <Typography variant="h6">{`Бюджет: ${element.estimation} ${element.currency}`}</Typography>
                <Typography variant="h6">{`Сумма затрат: ${projectCosts.reduce(
                  (a, b) => a + b.estimation,
                  0
                )} ${element.currency}`}</Typography>
              </div>
            </div>
          );
        })}
      </Box>
    </>
  );
});

export default CostList;
