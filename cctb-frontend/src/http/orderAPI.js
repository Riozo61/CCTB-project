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
    return data;
  } else {
    console.log(response);
    return false;
  }
};

export const getOrders = async (email, token) => {
  const response = await fetch("http://localhost:8080/api/orders", {
    method: "GET",
    mode: "cors",
    body: JSON.stringify({ email: email, token: token }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    console.log(response);
    return false;
  }
};
