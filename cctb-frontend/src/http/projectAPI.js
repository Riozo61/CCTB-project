export const newProject = async (nameProject, customer, address, timeline, estimation) => {
  const response = await fetch("http://localhost:8080/api/user/newproject", {
    method: "POST",
    mode: 'cors',
    body: { nameProject: nameProject, customer: customer, address: address, timeline: timeline, estimation: estimation },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    console.log(response)
    return false; 
};
};

export const projects = async (email, token) => {
  const response = await fetch("http://localhost:8080/api/user/projects", {
    method: "GET",
    mode: 'cors',
    body: { email: email, token: token},
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    console.log(response)
    return false; 
};
};

