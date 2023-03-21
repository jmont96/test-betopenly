import { getApi } from "./api";

export async function getUser(userId) {
  return getApi().get(`https://test-bo-api.onrender.com/api/user/${userId}`);
}

export async function getToken(userId) {
  return getApi().get(`https://test-bo-api.onrender.com/api/token/${userId}`);
}

export async function createUser(data) {
  return getApi().post(`https://test-bo-api.onrender.com/api/user`, data);
}
