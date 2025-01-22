import { getCookieData } from "../../components/Common/storageFun";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOGIN,
  LOG_OUT,
  SET_MOBILE_LOGIN_LOADER,
  UPDATE_LOGGED_IN_USER,
} from "../constants/reduxFormConstants";

const initialState = {
  data: {},
  loading: false,
  error: "",
  mobileLoginLoader: false,
  loggedInUser: getCookieData("loggedInUser"),
};

function login(state = initialState, action) {
  if (action.type === "undefined") {
    return state;
  }

  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case LOG_OUT:
      return {
        loading: false,
        data: {},
        error: "",
      };
    case SET_MOBILE_LOGIN_LOADER:
      return {
        ...state,
        mobileLoginLoader: action.payload,
      };

    case UPDATE_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };

    default:
      return state;
  }
}

export default login;
