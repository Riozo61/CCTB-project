import { $authHost } from "./index";

export const createNewPartnerMember = async (
  email,
  firstName,
  lastName,
  phone,
  type,
  company,
  rolePartner
) => {
  const { data } = await $authHost.post("api/partner/newpartner", {
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    type: type,
    company: company,
    rolePartner: rolePartner
  });
  return data;
};
export const getPartnerMember = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/partner/partners?_limit=${limit}&_page=${page}`
  );
  return data;
};