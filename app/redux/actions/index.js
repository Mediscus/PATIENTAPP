// actions/index.js
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

export const generateOtpRequest = (mobile) => ({
  type: GENERATE_OTP_REQUEST,
  payload: { ...mobile },
});

export const generateOtpSuccess = (otp, txnId) => ({
  type: GENERATE_OTP_SUCCESS,
  otp,
  txnId,
});

export const generateOtpFailure = (error) => ({
  type: GENERATE_OTP_FAILURE,
  error,
});

export function resendOtpRequest(txnId) {
  return {
    type: RESEND_OTP_REQUEST,
    payload: { ...txnId },
  };
}

export function resendOtpSuccess(txnId) {
  return {
    type: RESEND_OTP_SUCCESS,
    txnId,
  };
}

export function resendOtpFailure(error) {
  return {
    type: RESEND_OTP_FAILURE,
    error,
  };
}

//verifyOtp

export const verifyOtpRequest = (otp, txnId) => ({
  type: VERIFY_OTP_REQUEST,
  payload: { otp, ...txnId },
});

export const verifyOtpSuccess = (token) => ({
  type: VERIFY_OTP_SUCCESS,
  payload: { token },
});

export const verifyOtpFailure = (error) => ({
  type: VERIFY_OTP_FAILURE,
  error,
});

//healthId

export const createHealthIdRequest = (healthData) => ({
  type: CREATE_HEALTH_ID_REQUEST,
  payload: { ...healthData },
});

export const createHealthIdSuccess = () => ({
  type: CREATE_HEALTH_ID_SUCCESS,
});

export const createHealthIdFailure = (error) => ({
  type: CREATE_HEALTH_ID_FAILURE,
  error,
});
