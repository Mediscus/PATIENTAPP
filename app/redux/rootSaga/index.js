import { all } from "redux-saga/effects";
import { userLoginSaga, userRegisterSaga } from "./AllSagas";
import { watchOtpActions } from "./otpSaga";
import { watchAadharOtpRequests } from "./aadharOtpSaga";

export default function* rootSaga() {
  yield all([
    userLoginSaga(),
    watchOtpActions(),
    userRegisterSaga(),
    watchAadharOtpRequests(),
  ]);
}
