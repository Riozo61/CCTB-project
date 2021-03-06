import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../..";
import TeamList from "../../components/Team/TeamList";
import { getPartnerMember } from "../../http/axios/partnerAPI";
import { getEmployee, getOtherMember } from "../../http/axios/teamAPI";

const Team = observer(() => {
  const { member } = useContext(Context);
  const { otherMember } = useContext(Context);
  const { partnerMember } = useContext(Context);
  useEffect(() => {
    getEmployee().then((data) => {
      member.setMember(data.rows);
    });
    getOtherMember().then((data) => {
      otherMember.setOtherMember(data.rows);
    });
    getPartnerMember().then((data) => {
      partnerMember.setPartnerMember(data.rows);
    });
  }, []);

  return (
    <TeamList/>
);
  })

export default Team;
