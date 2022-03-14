import { $authHost } from "./index";

export const createNewShop = async (
  shopName
) => {
  const { data } = await $authHost.post("api/shop/newshop", {
    shopName: shopName
  });
  return data;
};

export const getShop = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/shop/shops?_limit=${limit}&_page=${page}`
  );
  return data;
};