import { $authHost } from "./index";

export const createNewMaterial = async (
  type, name, supplier, measure, shopName, quantity, brand
) => {
  const { data } = await $authHost.post("api/material/newmaterial", {
    type: type, name: name, supplier: supplier, measure: measure, shopName: shopName, quantity: quantity, brand: brand
  });
  return data;
};

export const getMaterials = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/material/materials?_limit=${limit}&_page=${page}`
  );
  return data;
};
