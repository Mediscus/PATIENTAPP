// reducers/otpReducer.js

import {
  GENERATE_OTP_REQUEST,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  CREATE_HEALTH_ID_REQUEST,
  CREATE_HEALTH_ID_SUCCESS,
  CREATE_HEALTH_ID_FAILURE,
} from "../constants/reduxFormConstants";

const initialState = {
  otp: null,
  txnId: null,
  healthId: null,
  loading: false,
  error: null,
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_OTP_REQUEST:
    case RESEND_OTP_REQUEST:
    case VERIFY_OTP_REQUEST:
    case CREATE_HEALTH_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GENERATE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otp: action.otp,
        txnId: action.txnId,
      };
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        txnId: action.txnId,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_HEALTH_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        healthId: action.healthId,
      };
    case GENERATE_OTP_FAILURE:
    case RESEND_OTP_FAILURE:
    case VERIFY_OTP_FAILURE:
    case CREATE_HEALTH_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default otpReducer;
