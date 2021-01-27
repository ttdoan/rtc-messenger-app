import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:" + (process.env.PORT || 5000),
});

async function getRequest(url, params) {
  try {
    return await instance.get(url, params).then((response) => response.data);
  } catch (err) {
    throw new Error(err.response.data.error.message);
  }
}

async function postRequest(url, params) {
  try {
    return await instance.post(url, params).then((response) => response.data);
  } catch (err) {
    throw new Error(err.response.data.error.message);
  }
}

async function getAuthRequest(url, params, token) {
  try {
    return await instance
      .get(url, {
        params,
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((response) => response.data);
  } catch (err) {
    throw new Error(err.response.data.error.message);
  }
}

async function postAuthRequest(url, params, token) {
  try {
    return await instance
      .post(url, params, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((response) => response.data);
  } catch (err) {
    throw new Error(err.response.data.error.message);
  }
}

export { getRequest, postRequest, getAuthRequest, postAuthRequest };
