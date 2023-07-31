import AxiosInstance from "./api";
import "regenerator-runtime/runtime";

export function prepareFormData(obj, form, namespace) {
  let fd = form || new FormData();
  let formKey;

  for (let property in obj) {
    if (obj.hasOwnProperty(property) && obj[property]) {
      if (namespace) {
        formKey = namespace + "[" + property + "]";
      } else {
        formKey = property;
      }
      // if the property is an object, but not a File, use recursivity.
      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString());
      } else if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        this.prepareFormData(obj[property], fd, formKey);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }
  return fd;
}

export function prepareGetData(data) {
  let params = "";
  if (data && Object.keys(data).length > 0 && data.constructor === Object) {
    for (var key in data) {
      if (params) {
        params = `${params}&${key}=${data[key]}`;
      } else {
        params = `?${key}=${data[key]}`;
      }
    }
  }
  return params;
}

const objectToFormData = function (obj, form, namespace) {
  var fd = form || new FormData();
  var formKey;

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + "[" + property + "]";
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, property);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};

function statusHelper(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}

function responseHelper(response) {
  if (response && response.data && !response.data.Error) {
    return Promise.resolve(response);
  }
  return Promise.reject(response.data.Error);
}

const getApiCall = async (url, method, headers, payload) => {
  let params = prepareGetData(payload);
  let uri = `${url}${params}`;

  return await AxiosInstance.get(uri)
    .then(statusHelper)
    .then(responseHelper)
    .then((response) => {
      return response.data;
    });
};

const postApiCall = async (url, method, headers, body) => {
  let params = objectToFormData(body);
  return await AxiosInstance.post(url, body)
    .then(statusHelper)
    .then(responseHelper)
    .then((response) => {
      return response.data;
    });
};

const putApiCall = async (url, method, headers, body) => {
  return await AxiosInstance.put(url, body)
    .then(statusHelper)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const deleteApiCall = async (url, method, headers, payload) => {
  let params = prepareGetData(payload);
  let uri = `${url}${params}`;

  return await AxiosInstance.delete(uri)
    .then(statusHelper)
    .then(responseHelper)
    .then((response) => {
      return response.data;
    });
};

const apiCall = (url, method, body, headers) => {
  switch (method) {
    case "get":
      return getApiCall(url, method, headers, body);

    case "post":
      return postApiCall(url, method, headers, body);

    case "put":
      return putApiCall(url, method, headers, body);

    case "delete":
      return deleteApiCall(url, method, headers, body);

    default:
      return getApiCall(url, method, headers, body);
  }
};

export default apiCall;
