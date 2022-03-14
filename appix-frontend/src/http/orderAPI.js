export const createNewOrder = async (
  orderName, supplier, project, measure, photo, shopName, brand, quantity
) => {
  const response = await fetch("http://localhost:8080/api/order/neworder", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      orderName: orderName,
      supplier: supplier,
      project: project,
      measure: measure,
      photo: photo,
      shopName: shopName,
      brand: brand,
      quantity: quantity,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    console.log(data)
    return data;
  } else {
    console.log(response);
    return false;
  }
};

export const getOrders = async (limit, page) => {
  const response = await fetch(`http://localhost:8080/api/order/orders?limit=${limit}&page=${page}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    console.log(data)
    return data;
  } else {
    console.log(response);
    return false;
  }
};
