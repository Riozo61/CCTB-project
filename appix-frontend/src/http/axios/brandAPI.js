import { $authHost } from "./index";

export const createNewBrand = async (
  brandName
) => {
  const { data } = await $authHost.post("api/brand/newbrand", {
    brandName: brandName
  });
  return data;
};

export const getBrand = async (limit, page) => {
  const { data } = await $authHost.get(
    `api/brand/brands?_limit=${limit}&_page=${page}`
  );
  return data;
};