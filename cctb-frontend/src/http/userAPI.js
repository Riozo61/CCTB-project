import jwt_decode from "jwt-decode";

export const registration = async (email, password, role) => {
  const response = await fetch("http://localhost:8080/api/user/registration", {
    method: "POST",
    mode: 'cors',
    body: JSON.stringify({ email: email, password: password, role: role }),
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
  }
};

export const login = async (email, password) => {
  const response = await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    mode: 'cors',
    body: JSON.stringify({ email: email, password: password}),
    headers: {
      "Content-Type": "application/json",
    },
  }
  );
  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem('token', data.token)
    console.log(data)
    console.log(response)
    return data;
  } else {
    console.log(response)
    return false; 
};
}

export const check = async () => {
  const data = await fetch('http://localhost:8080/api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}

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


// export const login = async (email, password) => {
//   const { data } = await $host.post(
//     { url: "api/user/login" },
//     { email, password }
//   );
//   return jwt_decode(data.token);
// };

// export const check = async () => {
//   const response = await $host.post({ url: "api/auth/registration" });
//   return response;
// };
