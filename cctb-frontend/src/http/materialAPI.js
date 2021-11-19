export const createNewMaterial = async (
  type, supplier, name, measure, shopName, quantity
) => {
  const response = await fetch("http://localhost:8080/api/order/newmaterial", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      type: type,
      name: name,
      supplier: supplier,
      measure: measure,
      shopName: shopName,
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

export const createNewEquipment = async (
  type, brand, name, typeObj, serialNumber
) => {
  const response = await fetch("http://localhost:8080/api/order/newequipment", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      type: type,
      name: name,
      brand: brand,
      typeObj: typeObj,
      serialNumber: serialNumber,
      
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
  const response = await fetch(`http://localhost:8080/api/order/materials?_limit=${limit}&_page=${page}`, {
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
