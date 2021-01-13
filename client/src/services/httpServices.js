import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:" + process.env.PORT,
});

async function getRequest(url, params) {
  try {
    return await instance.get(url, params).then((response) => response.data);
  } catch (err) {
    throw new Error(err);
  }
}

async function postRequest(url, params) {
  try {
    return await instance.post(url, params).then((response) => response.data);
  } catch (err) {
    throw new Error(err);
  }
}

export { getRequest, postRequest };
