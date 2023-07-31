import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOGIN,
  LOG_OUT,
} from "../constants/reduxFormConstants";

const initialState = {
  data: {},
  loading: false,
  error: "",
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

    default:
      return state;
  }
}

export default login;
