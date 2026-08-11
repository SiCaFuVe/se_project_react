const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(`Error: ${response.status}`));
  }
  return response.json();
};

const getAuthHeaders = (token) => {
  return token
    ? {
        ...headers,
        authorization: `Bearer ${token}`,
      }
    : headers;
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const updateCurrentUser = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};

export const addCardLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(token),
  }).then(handleServerResponse);
};

export const removeCardLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const removeItem = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  }).then(handleServerResponse);
};
