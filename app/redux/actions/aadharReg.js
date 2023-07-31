// actions/index.js
import {
  GENERATE_OTP_AADHAR_REQUEST,
  GENERATE_OTP_AADHAR_SUCCESS,
  GENERATE_OTP_AADHAR_FAILURE,
  RESEND_OTP_AADHAR_REQUEST,
  RESEND_OTP_AADHAR_SUCCESS,
  RESEND_OTP_AADHAR_FAILURE,
  VERIFY_OTP_AADHAR_REQUEST,
  VERIFY_OTP_AADHAR_SUCCESS,
  VERIFY_OTP_AADHAR_FAILURE,
  CREATE_HEALTH_ID_AADHAR_REQUEST,
  CREATE_HEALTH_ID_AADHAR_SUCCESS,
  CREATE_HEALTH_ID_AADHAR_FAILURE,
} from "../constants/reduxFormConstants";

export const generateAadharOtpRequest = (aadhaar) => ({
  type: GENERATE_OTP_AADHAR_REQUEST,
  payload: { ...aadhaar },
});

export const generateAadharOtpSuccess = (otp, txnId) => ({
  type: GENERATE_OTP_AADHAR_SUCCESS,
  otp,
  txnId,
});

export const generateAadharOtpFailure = (error) => ({
  type: GENERATE_OTP_AADHAR_FAILURE,
  error,
});

export function resendAadharOtpRequest(txnId) {
  return {
    type: RESEND_OTP_AADHAR_REQUEST,
    payload: { ...txnId },
  };
}

export function resendAadharOtpSuccess(txnId) {
  return {
    type: RESEND_OTP_AADHAR_SUCCESS,
    txnId,
  };
}

export function resendAadharOtpFailure(error) {
  return {
    type: RESEND_OTP_AADHAR_FAILURE,
    error,
  };
}

//verifyOtp

export const verifyAadharOtpRequest = (otp, txnId) => ({
  type: VERIFY_OTP_AADHAR_REQUEST,
  payload: { otp, ...txnId },
});

export const verifyAadharOtpSuccess = (token) => ({
  type: VERIFY_OTP_AADHAR_SUCCESS,
  payload: { token },
});

export const verifyAadharOtpFailure = (error) => ({
  type: VERIFY_OTP_AADHAR_FAILURE,
  error,
});

//healthId

export const createAadharHealthIdRequest = (healthData) => ({
  type: CREATE_HEALTH_ID_AADHAR_REQUEST,
  payload: { ...healthData },
});

export const createAadharHealthIdSuccess = () => ({
  type: CREATE_HEALTH_ID_AADHAR_SUCCESS,
});

export const createAadharHealthIdFailure = (error) => ({
  type: CREATE_HEALTH_ID_AADHAR_FAILURE,
  error,
});
