import { $authHost } from "./index";

export const createNewProject = async (
  projectName,
  status,
  contract,
  estimation,
  file,
  dateStart,
  dateEnd,
  projManager,
  customer,
  customerName,
  payment,
  currency
) => {
  const { data } = await $authHost.post("api/project/newproject", {
    projectName: projectName,
    status: status,
    contract: contract,
    estimation: estimation,
    file: file,
    dateStart: dateStart,
    dateEnd: dateEnd,
    projManager: projManager,
    customer: customer,
    customerName: customerName,
    payment: payment,
    currency: currency,
  });
  return data;
};

export const getProjects = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/project/projects?_limit=${limit}&_page=${page}`
  );
  return data;
};
