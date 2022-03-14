import { makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import TeamButtons from "../../components/Team/TeamButtons";

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
    marginTop: 15
  },
  box: {
    margin: 30,
  },
  div: {
    marginBottom: 50,
    height: 400,
    width: "100%",
  },
}));

const columnsMember = [
  { field: "firstName", headerName: "Имя", width: 220 },
  { field: "lastName", headerName: "Фамилия", width: 220 },
  { field: "email", headerName: "email", width: 220 },
  {
    field: "role",
    headerName: "Роль",
    width: 220,
  },
  {
    field: "phone",
    headerName: "Телефон",
    width: 220,
  },
  { field: "salary", headerName: "Зарплата", width: 220 },
  { field: "currency", headerName: "Валюта", width: 150 },
];
const columnsPartner = [
  { field: "firstName", headerName: "Имя", width: 220 },
  { field: "lastName", headerName: "Фамилия", width: 220 },
  { field: "email", headerName: "email", width: 220 },
  {
    field: "phone",
    headerName: "Телефон",
    width: 220,
  },
  { field: "company", headerName: "Компания", width: 220 },
];

const columnsOthers = [
  { field: "firstName", headerName: "Имя", width: 300 },
  { field: "lastName", headerName: "Фамилия", width: 300 },
  { field: "email", headerName: "email", width: 300 },
  {
    field: "phone",
    headerName: "Телефон",
    width: 300,
  },
  { field: "company", headerName: "Компания", width: 300 },
];

const TeamList = observer(() => {
  const classes = useStyles();
  const { partnerMember } = useContext(Context);
  const { member } = useContext(Context);
  const { otherMember } = useContext(Context);
  const members = [];
  if (member.member[0]) {
    member.member.forEach((e) => {
      members.push(e);
    });
  }
  const customer = [];
  if (otherMember.otherMember[0]) {
    otherMember.otherMember.forEach((element) => {
      if (element.type === "Заказчик") {
        customer.push(element);
      }
    });
  }
  const subcontractor = [];
  const supplier = [];
  if (partnerMember.partnerMember[0]) {
    partnerMember.partnerMember.forEach((element) => {
      if (element.rolePartner === "Субподрядчик") {
        subcontractor.push(element);
      } else {
        supplier.push(element);
      }
    });
  }

  return (
    <>
    <Toolbar className={classes.toolBar}>
          <Typography variant="h4" className={classes.header2}>
            Команда
          </Typography>
          <TeamButtons className={classes.button} />
        </Toolbar>
      <Box className={classes.box}>
        <div>
          <Typography variant="h5" className={classes.header2}>
            Сотрудники
          </Typography>
          <div className={classes.div}>
            <DataGrid
              disableColumnMenu={'true'}
              getRowId={(row) => row.id}
              rows={members}
              columns={columnsMember}
              pageSize={20}
              rowsPerPageOptions={[20]}
            />
          </div>
        </div>
        <div>
          <Typography variant="h5" className={classes.header2}>
            Заказчики
          </Typography>
          <div className={classes.div}>
            <DataGrid
              disableColumnMenu={'true'}
              getRowId={(row) => row.id}
              rows={customer}
              columns={columnsOthers}
              pageSize={20}
              rowsPerPageOptions={[20]}
            />
          </div>
        </div>
        <div>
          <Typography variant="h5" className={classes.header2}>
            Субподрядчики
          </Typography>
          <div className={classes.div}>
            <DataGrid
              disableColumnMenu={'true'}
              getRowId={(row) => row.id}
              rows={subcontractor}
              columns={columnsPartner}
              pageSize={20}
              rowsPerPageOptions={[20]}
            />
          </div>
        </div>
        <div>
          <Typography variant="h5" className={classes.header2}>
            Поставщики
          </Typography>
          <div className={classes.div}>
            <DataGrid
              disableColumnMenu={'true'}
              getRowId={(row) => row.id}
              rows={supplier}
              columns={columnsOthers}
              pageSize={20}
              rowsPerPageOptions={[20]}
            />
          </div>
        </div>
      </Box>
    </>
  );
});

export default TeamList;
