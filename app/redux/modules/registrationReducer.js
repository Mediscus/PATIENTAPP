import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_CREATE_MOBILE_USER_LOADER,
  SET_MOBILE_REGISTRATION_VERIFY_OTP_LOADER,
  SET_SHOW_ACCOUNT_STATUS,
  USER_REGISTER,
} from "../constants/reduxFormConstants";

const initialState = {
  data: [],
  loading: false,
  error: "",
  createMobileUserLoader: false,
  mobileRegVerifyOtpLoader: false,
  showAccountStatus: {
    isShow: false,
    status: "",
  },
};

function registrationReducer(state = initialState, action) {
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
    case SET_CREATE_MOBILE_USER_LOADER:
      return {
        ...state,
        createMobileUserLoader: action.payload,
      };
    case SET_MOBILE_REGISTRATION_VERIFY_OTP_LOADER:
      return {
        ...state,
        mobileRegVerifyOtpLoader: action.payload,
      };
    case SET_SHOW_ACCOUNT_STATUS:
      return {
        ...state,
        showAccountStatus: action.payload,
      };

    default:
      return state;
  }
}

export default registrationReducer;
