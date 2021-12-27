import { List } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Context } from "../..";
import OtherMemberList from "../../components/Team/OtherMemberList";
import TeamButtons from "../../components/Team/TeamButtons";
import TeamList from "../../components/Team/TeamList";
import { getEmployee, getOtherMember } from "../../http/axios/teamAPI";

const Team = () => {
  const { member } = useContext(Context);
  const { otherMember } = useContext(Context);
  useEffect(() => {
    getEmployee().then((data) => {
      member.setMember(data.rows);
    });
    getOtherMember().then((data) => {
      otherMember.setOtherMember(data.rows);
    });
  }, []);
  return (
    <div>
      <List>
        <TeamButtons />
        <h2>Сотрудники</h2>
        {member.member?.[0] && <TeamList members={member.member} />}
        <h2>Заказчики</h2>
        {otherMember.otherMember?.[0] &&
          otherMember.otherMember.type === "Заказчик" && (
            <OtherMemberList otherMembers={otherMember.otherMember} />
          )}
        <h2>Партнеры</h2>
        {otherMember.otherMember?.[0] &&
          otherMember.otherMember.type === "Партнер" && (
            <OtherMemberList otherMembers={otherMember.otherMember} />
          )}

        <h2>Субподрядчики</h2>
        {otherMember.otherMember?.[0] &&
          otherMember.otherMember.type === "Субподрядчик" && (
            <OtherMemberList otherMembers={otherMember.otherMember} />
          )}

        <h2>Поставщики</h2>
        {otherMember.otherMember?.[0] &&
          otherMember.otherMember.type === "Поставщик" && (
            <OtherMemberList otherMembers={otherMember.otherMember} />
          )}
      </List>
    </div>
  );
};

export default Team;
