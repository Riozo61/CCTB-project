import { $authHost } from "./index";

export const createNewEquipment = async (
  type, brand, name, typeObj, serialNumber
) => {
  const { data } = await $authHost.post("api/order/newmaterial", {
    type: type, brand: brand, name: name, typeObj: typeObj, serialNumber: serialNumber
  });
  return data;
};

export const getEquipment = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/order/materials?_limit=${limit}&_page=${page}`
  );
  return data;
};