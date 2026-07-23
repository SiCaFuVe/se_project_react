const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};

const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${token}`,
});

export const signUp = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

export const signIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: getAuthHeaders(token),
  }).then(handleServerResponse);
};
