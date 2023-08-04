import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
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

const BaseURI = "https://healthidsbx.abdm.gov.in";
const BasePath = "api";

// Function to call the API for generating OTP
function* generateOtp(action) {
  try {
    const { aadhaar } = action.payload;
    const response = yield call(
      axios.post,
      `${BaseURI}/${BasePath}/aadhaar/generateOtp`,
      { aadhaar }
    );
    yield put({ type: GENERATE_OTP_AADHAR_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: GENERATE_OTP_AADHAR_FAILURE, payload: error.message });
  }
}

// Function to call the API for verifying OTP
function* verifyOtp(action) {
  try {
    const { txnId, otp } = action.payload;
    const response = yield call(
      axios.post,
      `${BaseURI}/${BasePath}/aadhaar/verifyOTP`,
      { txnId, otp }
    );
    yield put({ type: VERIFY_OTP_AADHAR_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: VERIFY_OTP_AADHAR_FAILURE, payload: error.message });
  }
}

// Watcher saga to listen for OTP generation and verification requests
export function* watchAadharOtpRequests() {
  // yield takeLatest(GENERATE_OTP_AADHAR_REQUEST, generateOtp);
  // yield takeLatest(VERIFY_OTP_AADHAR_REQUEST, verifyOtp);
}
