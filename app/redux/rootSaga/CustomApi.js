import { put } from "redux-saga/effects";
export default function* customAPI(action) {
    try {
      let result = yield action.method(action.url, action.data);
      if (
        (result.data.Data && result.data.Data !== null) ||
        (result.data.Details && result.data.Details !== null)
      ) {
        if (action.success == "LOGIN_SUCCESS" && result.data.Data.authToken) {
          localStorage.setItem("authToken", result.data.Data.authToken);
        }
        yield put({ type: action.success, data: result.data });
      } else {
        yield put({ type: action.fail, error: result.data.Error.ErrorMessage });
      }
    } catch (Error) {
      console.log("Error", Error);
    }
  }