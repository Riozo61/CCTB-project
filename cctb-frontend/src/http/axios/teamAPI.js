import { $authHost } from "./index";

export const createNewEmployee = async (
  email,
  firstName,
  lastName,
  role,
  phone,
  salary,
  currency,
  type
) => {
  const { data } = await $authHost.post("api/employee/newemployee", {
    email: email,
    firstName: firstName,
    lastName: lastName,
    role: role,
    phone: phone,
    salary: salary,
    currency: currency,
    type: type,
  });
  return data;
};

export const getEmployee = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/employee/employees?_limit=${limit}&_page=${page}`
  );
  return data;
};

export const createOtherMember = async (
  email,
  firstName,
  lastName,
  phone,
  type,
  company
) => {
  const { data } = await $authHost.post("api/others/newother", {
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    type: type,
    company: company
  });
  return data;
};
export const getOtherMember = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/others/others?_limit=${limit}&_page=${page}`
  );
  return data;
};
