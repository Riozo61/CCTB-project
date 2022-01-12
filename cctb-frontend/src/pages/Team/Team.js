import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../..";
import TeamButtons from "../../components/Team/TeamButtons";
import { getPartnerMember } from "../../http/axios/partnerAPI";
import { getEmployee, getOtherMember } from "../../http/axios/teamAPI";

const columnsMember = [
  { field: "email", headerName: "email", width: 200 },
  { field: "firstName", headerName: "Имя", width: 190 },
  { field: "lastName", headerName: "Фамилия", width: 130 },
  {
    field: "role",
    headerName: "Роль",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Телефон",
    width: 150,
  },
  { field: "salary", headerName: "Зарплата", width: 150 },
  { field: "currency", headerName: "Валюта", width: 150 },
];
const columnsPartner = [
  { field: "email", headerName: "email", width: 200 },
  { field: "firstName", headerName: "Имя", width: 190 },
  { field: "lastName", headerName: "Фамилия", width: 130 },
  {
    field: "phone",
    headerName: "Телефон",
    width: 150,
  },
  { field: "company", headerName: "Компания", width: 130 },

];

const columnsOthers = [
  { field: "email", headerName: "email", width: 200 },
  { field: "firstName", headerName: "Имя", width: 190 },
  { field: "lastName", headerName: "Фамилия", width: 130 },
  {
    field: "phone",
    headerName: "Телефон",
    width: 150,
  },
  { field: "company", headerName: "Компания", width: 130 },


];

const Team = observer(() => {
  const { member } = useContext(Context);
  const { otherMember } = useContext(Context);
  const {partnerMember} = useContext(Context)
  useEffect(() => {
    getEmployee().then((data) => {
      member.setMember(data.rows);
    });
    getOtherMember().then((data) => {
      otherMember.setOtherMember(data.rows);
    });
    getPartnerMember().then((data) => {
      partnerMember.setPartnerMember(data.rows)
    })
  }, []);
  const members = [];
  const customer = [];
  const partner = [];
  const subcontractor = [];
  const supplier = [];
  
if (otherMember.otherMember[0]){
  otherMember.otherMember.forEach((element) => {
    if (element.type === "Заказчик") {
      customer.push(element);
  };
})};
if (partnerMember.partnerMember[0]) {
  partnerMember.partnerMember.forEach((element) => {
    if (partnerMember.rolePartner === "Субподрядчик") {
      subcontractor.push(element);
    } else {
      supplier.push(element);
    }
  })
}
  if (member.member[0]){
    member.member.forEach((e) => {
        members.push(e);
    }
    );
  }
  
  return (
    <div>
    <TeamButtons />
    <Box style={{width: 1000, marginLeft: "auto", marginRight: 'auto'}}>
        {members?.[0] && (
          <div>
            <h2>Сотрудники</h2>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={members}
                columns={columnsMember}
                pageSize={20}
                rowsPerPageOptions={[20]}
              />
            </div>
          </div>
        )}


        {customer?.[0] && (
          <div>
            <h2>Заказчики</h2>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={customer}
                columns={columnsOthers}
                pageSize={20}
                rowsPerPageOptions={[20]}
              />
            </div>
          </div>
        )}



        {partner?.[0] && (
          <div>
            <h2>Партнеры</h2>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={partner}
                columns={columnsPartner}
                pageSize={20}
                rowsPerPageOptions={[20]}
              />
            </div>
          </div>
        )}


        {subcontractor?.[0] && (
          <div>
            <h2>Субподрядчики</h2>

            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={subcontractor}
                columns={columnsPartner}
                pageSize={20}
                rowsPerPageOptions={[20]}
              />
            </div>
          </div>
        )}


        {supplier?.[0] && (
          <div>
            <h2>Поставщики</h2>

            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={supplier}
                columns={columnsOthers}
                pageSize={20}
                rowsPerPageOptions={[20]}
              />
            </div>
          </div>
        )}

    </Box>
    </div>
  );
});

export default Team;
