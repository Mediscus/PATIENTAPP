import async from "async";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const generateRequestId = () => {
  return uuidv4();
};

const requestId = generateRequestId();

export const addCareContext = () => {
  var resultObj = {};

  async.waterfall(
    [
      (callback) => {
        fetchModes(resultObj, callback);
      },
      (fetchAuth, fetchCallback) => {
        fetchModeCallback(resultObj, fetchCallback);
      },
      (fetchAuthResult, authInitCallback) => {
        onAuthInit(resultObj, authInitCallback);
      },
      (authInit, onInitCallback) => {
        onAuthInitCallback(resultObj, onInitCallback);
      },
      (authInitResult, authConfirmCallback) => {
        onAuthConfirm(resultObj, authConfirmCallback);
      },
      (authConfirm, onConfirmCallback) => {
        onAuthConfirmCallback(resultObj, onConfirmCallback);
      },
    ],
    (err, result) => {
      console.log("err", err);
      console.log("finalResult", result);
    }
  );
  return resultObj;
};

/**M2 · Fetch Auth Modes */
const fetchModes = async (resultObj, callback) => {
  try {
    const postResponse = await axios.post(
      "https://api.mediscus.app/abdm-hs/callback/api/user_auth/fetch_auth_modes",
      {
        requestId: generateRequestId(),
        timestamp: new Date().toISOString(),
        query: {
          id: "91538876455287@sbx",
          purpose: "KYC_AND_LINK",
          requester: {
            type: "HIP",
            id: "IN2910001559",
          },
        },
      },
      {
        headers: {
          "X-CM-ID": "sbx",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("fetchModes", postResponse);
    callback(null, resultObj);
  } catch (err) {
    console.error("Error details:", err);
    callback(err.message);
  }
};

/**M2 · Fetch Auth Modes callback*/

const fetchModeCallback = async (resultObj, fetchCallback) => {
  try {
    const getResponse = await axios.get(
      "https://api.mediscus.app/abdm-hs/callback/v0.5/users/auth/on-fetch-modes"
    );
    resultObj = {
      fetchMode: getResponse.data,
    };
    console.log(resultObj);
    fetchCallback(null, resultObj);
  } catch (err) {
    console.error("Error details:", err);
    fetchCallback(err.message);
  }
};

/**M2 · Init Auth */
const onAuthInit = async (resultObj, authInitCallback) => {
  try {
    const postResponse = await axios.post(
      "https://api.mediscus.app/abdm-hs/users/auth/on-init",
      // "https://api.mediscus.app/abdm-hs/callback/v0.5/users/auth/on-init",
      {
        requestId: generateRequestId(),
        timestamp: new Date().toISOString(),
        query: {
          id: "91538876455287@sbx",
          purpose: "KYC_AND_LINK",
          // authMode: "MOBILE_OTP",
          authMode: "DEMOGRAPHICS",
          requester: {
            type: "HIP",
            id: "IN2910001559",
          },
        },
      },
      {
        headers: {
          "X-CM-ID": "sbx",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("fetchModes", postResponse);
    authInitCallback(null, resultObj);
  } catch (err) {
    console.error("Error details:", err);
    authInitCallback(err.message);
  }
};

/**M2 · Init Auth callback*/
const onAuthInitCallback = async (resultObj, onInitCallback) => {
  try {
    const getResponse = await axios.get(
      "https://api.mediscus.app/abdm-hs/callback/v0.5/users/auth/on-init"
      // "https://api.mediscus.app/abdm-hs/users/auth/on-init"
    );
    resultObj = {
      ...resultObj,
      onAuthInit: getResponse.data,
    };
    console.log(resultObj);
    onInitCallback(null, resultObj);
  } catch (err) {
    console.error("Error details:", err);
    onInitCallback(err.message);
  }
};

/**M2 · Confirm Auth */
const onAuthConfirm = async (resultObj, authConfirmCallback) => {
  try {
    const postResponse = await axios.post(
      "https://api.mediscus.app/abdm-hs/callback/v0.5/users/auth/on-confirm",
      {
        requestId: requestId,
        timestamp: new Date().toISOString(),
        transactionId: "2f2c15ef-647b-45dd-932c-88bbb72c6a15",
        credential: {
          demographics: {
            name: "Anushree Dattatray More",
            gender: "Female",
            dateOfBirth: "12-11-2000",
          },
        },
      },
      {
        headers: {
          "X-CM-ID": "sbx",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("fetchModes", postResponse);
    authConfirmCallback(null, resultObj);
  } catch (err) {
    console.error("Error details:", err);
    authConfirmCallback(err.message);
  }
};

/**M2 · Confirm Auth callback */
const onAuthConfirmCallback = async (resultObj, onConfirmCallback) => {
  try {
    const getResponse = await axios.get(
      "https://api.mediscus.app/abdm-hs/callback/v0.5/users/auth/on-confirm"
    );
    resultObj = {
      ...resultObj,
      onAuthConfirm: getResponse.data,
    };
    console.log(resultObj);
    onConfirmCallback(null, resultObj);
  } catch (err) {
    console.error("Error details:", err);
    onConfirmCallback(err.message);
  }
};
