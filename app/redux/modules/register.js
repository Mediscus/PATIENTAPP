import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_REGISTER,
} from "../constants/reduxFormConstants";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

function register(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default register;
