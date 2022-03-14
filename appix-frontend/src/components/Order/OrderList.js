import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header2: {
    flexGrow: 1,
    marginBottom: 25,
    marginLeft: 10,
  },
  div: {
    marginBottom: 70,
    height: 800,
    width: "100%",
  },
}));

const columns = [
  { field: "orderName", headerName: "Название заявки", width: 200 },
  { field: "supplier", headerName: "Поставщик", width: 200 },
  { field: "project", headerName: "Проект", width: 200 },
  { field: "quantity", headerName: "Количество", width: 200 },
  {
    field: "measure",
    headerName: "Ед.измерения",
    width: 200,
  },
  {
    field: "photo",
    headerName: "Фото",
    width: 200,
  },
  { field: "shopName", headerName: "Название магазина", width: 200 },
  { field: "brand", headerName: "Бренд", width: 200 },

];

const OrderList = observer(() => {
  const { order } = useContext(Context);
  const classes = useStyles();
  const rows = [];
  if (order.order[0]) {
    order.order.forEach((element) => {
      rows.push(element);
    });
  }

  return (
    <Box>
      <div className={classes.div}>
        <DataGrid
          disableColumnMenu={'true'}
          getRowId={(row) => row.id}
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
        />
      </div>
    </Box>
  );
});

export default OrderList;
