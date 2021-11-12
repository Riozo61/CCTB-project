import jwt_decode from "jwt-decode";

export const registration = async (email, password, role, firstName, lastName, company) => {
  const response = await fetch("http://localhost:8080/api/user/registration", {
    method: "POST",
    mode: 'cors',
    body: JSON.stringify({ email: email, password: password, role: role, firstName: firstName, lastName:lastName, company: company }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem('token', data.token)
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

export const check = async (email, token) => {
  const response = await fetch('http://localhost:8080/api/user/auth', {
    method: "GET",
    mode: 'cors',
    body: {email: email, token: token},
    headers: {
      "Content-Type": "application/json",
    },
  });
    localStorage.setItem('token', response.token)
    return jwt_decode(response.token);    
  }

