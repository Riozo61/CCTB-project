import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import React from "react";

const columnsMember = [
  { field: "email", headerName: "email", width: 220},
  { field: "firstName", headerName: "Имя", width: 220 },
  { field: "lastName", headerName: "Фамилия", width: 220 },
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
  { field: "email", headerName: "email", width: 220 },
  { field: "firstName", headerName: "Имя", width: 220 },
  { field: "lastName", headerName: "Фамилия", width: 220 },
  {
    field: "phone",
    headerName: "Телефон",
    width: 220,
  },
  { field: "company", headerName: "Компания", width: 220 },
];

const columnsOthers = [
  { field: "email", headerName: "email", width: 300 },
  { field: "firstName", headerName: "Имя", width: 300 },
  { field: "lastName", headerName: "Фамилия", width: 300 },
  {
    field: "phone",
    headerName: "Телефон",
    width: 300,
  },
  { field: "company", headerName: "Компания", width: 300 },
];

const TeamList = observer(({otherMember, partnerMember, member}) => {

  const members = [];
  const customer = [];
  const subcontractor = [];
  const supplier = [];

  if (otherMember[0]) {
    otherMember.forEach((element) => {
      if (element.type === "Заказчик") {
        customer.push(element);
      }
    });
  }
  if (partnerMember[0]) {
    partnerMember.forEach((element) => {
      if (element.rolePartner === "Субподрядчик") {
        subcontractor.push(element);
      } else {
        supplier.push(element);
      }
    });
  }
  if (member[0]) {
    member.forEach((e) => {
      members.push(e);
    });
  }

  return (
    <div>
      <div>
        <Box
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >

            <div>
              <h2>Сотрудники</h2>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row.id}
                  rows={members}
                  columns={columnsMember}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                />
              </div>
            </div>


          {customer?.[0] && (
            <div>
              <h2>Заказчики</h2>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row.id}
                  rows={customer}
                  columns={columnsOthers}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                />
              </div>
            </div>
          )}


            <div>
              <h2>Субподрядчики</h2>

              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row.id}
                  rows={subcontractor}
                  columns={columnsPartner}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                />
              </div>
            </div>


            <div>
              <h2>Поставщики</h2>

              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row.id}
                  rows={supplier}
                  columns={columnsOthers}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                />
              </div>
            </div>

        </Box>
      </div>
    </div>
  );
});

export default TeamList;
