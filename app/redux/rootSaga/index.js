import { all } from "redux-saga/effects";
import { userLoginSaga, userRegisterSaga } from "./AllSagas";

export default function* rootSaga() {
  yield all([userLoginSaga(), userRegisterSaga()]);
}
