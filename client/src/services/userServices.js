import { getRequest, postRequest } from "./httpServices";

async function login(email, password) {
  await getRequest("/login", { email, password });
}

async function signup(email, password) {
  await postRequest("/signup", { email, password });
}

export { login, signup };
