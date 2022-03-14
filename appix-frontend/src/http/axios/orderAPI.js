import { $authHost } from "./index";

export const createNewOrder = async (
  orderName,
  supplier,
  project,
  measure,
  photo,
  shopName,
  brand,
  quantity
) => {
  const { data } = await $authHost.post("api/order/neworder", {
    orderName: orderName,
    supplier: supplier,
    project: project,
    measure: measure,
    photo: photo,
    shopName: shopName,
    brand: brand,
    quantity: quantity,
  });
  return data;
};

export const getOrders = async () => {
  const { data } = await $authHost.get(
    `api/order/orders`
  );
  return data;
};
