import { $authHost } from "./index";

export const createNewMaterial = async (
  type, name, supplier, measure, shopName, quantity
) => {
  const { data } = await $authHost.post("api/material/newmaterial", {
    type, name, supplier, measure, shopName, quantity
  });
  return data;
};

export const getMaterials = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/material/materials?_limit=${limit}&_page=${page}`
  );
  return data;
};
