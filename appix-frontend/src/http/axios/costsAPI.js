import { $authHost } from "./index";

export const createNewCosts = async (
  type, estimation, description, project, currency
) => {
  const { data } = await $authHost.post("api/cost/newcost", {
    type: type, estimation: estimation, description: description, project:project, currency:currency
  });
  return data;
};

export const getCosts = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/cost/costs?_limit=${limit}&_page=${page}`
  );
  return data;
};