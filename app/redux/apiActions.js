import instance from "./api";

export async function postAPI(url, payload) {
  try {
    const result = await instance.post(url, payload);
    return result;
  } catch (err) {
    if (err.response) {
      return err.response;
    }
    return false;
  }
}

export async function putAPI(url, payload) {
  try {
    const result = await instance.put(baseURL + url, payload, headers);
    return result;
  } catch (err) {
    if (err.response) {
      return err.response;
    }
    return false;
  }
}

export async function deleteAPI(url, payload) {
  try {
    const result = await instance.delete(baseURL + url, payload, headers);
    return result;
  } catch (err) {
    if (err.response) {
      return err.response;
    }
    return false;
  }
}

export async function getAPI(url) {
  try {
    const result = await instance.get(baseURL + url, headers);
    return result;
  } catch (err) {
    if (err.response) {
      return err.response;
    }
    return false;
  }
}
