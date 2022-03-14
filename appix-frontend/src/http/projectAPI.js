export const createNewProject = async (
  projectName,
  status,
  contract,
  estimation,
  file,
  dateStart,
  dateEnd,
  projManager,
  customer,
  customerName,
  payment,
  currency
) => {
  const response = await fetch("http://localhost:8080/api/project/newproject", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      projectName: projectName,
      status: status,
      contract: contract,
      estimation: estimation,
      file: file,
      dateStart: dateStart,
      dateEnd: dateEnd,
      projManager: projManager,
      customer: customer,
      customerName: customerName,
      payment: payment,
      currency: currency
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

export const getProjects = async (limit, page) => {
  const response = await fetch(`http://localhost:8080/api/project/projects?_limit=${limit}&_page=${page}`,{ 
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
