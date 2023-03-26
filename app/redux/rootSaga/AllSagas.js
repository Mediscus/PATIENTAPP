import * as types from "../constants/reduxFormConstants";
import { takeLatest} from "redux-saga/effects";
import customAPI from "./CustomApi";



export const userRegisterSaga = function* userRegisterSaga() {
  yield takeLatest(types.USER_REGISTER, customAPI);
};

export const userLoginSaga = function* userLoginSaga() {
  yield takeLatest(types.USER_LOGIN, customAPI);
};