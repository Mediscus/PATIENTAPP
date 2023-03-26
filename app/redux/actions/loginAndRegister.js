import { postAPI } from "../apiActions";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN,
  USER_REGISTER
} from "../constants/reduxFormConstants";

export const userLogin = (data) => ({
  type: USER_LOGIN,
  success: LOGIN_SUCCESS,
  fail: LOGIN_FAIL,
  data,
  url: "account/login",
  method: postAPI,
});

export const userRegister = (data) => ({
  type: USER_REGISTER,
  success: REGISTER_SUCCESS,
  fail: REGISTER_FAIL,
  data,
  url: "account/register",
  method: postAPI,
});

export const userLogout = () => ({
  type: LOG_OUT
});