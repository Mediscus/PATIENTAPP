// sagas/otpSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
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
  GENERATE_OTP_AADHAR_REQUEST,
  GENERATE_OTP_AADHAR_FAILURE,
} from "../constants/reduxFormConstants";

function* generateOtpSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:3002/api/generateOtp",
      action.payload
    );
    const txnId = response.data; // Assuming the OTP is returned in the response

    yield put({ type: GENERATE_OTP_SUCCESS, txnId });
  } catch (error) {
    yield put({ type: GENERATE_OTP_FAILURE, error: error.message });
  }
}

// Resend OTP saga
function* resendOtpSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:3002/api/resendOtp",
      action.payload
    );
    const txnId = response.data; // Assuming the new OTP is returned in the response

    yield put({ type: RESEND_OTP_SUCCESS, txnId });
  } catch (error) {
    yield put({ type: RESEND_OTP_FAILURE, error: error.message });
  }
}
// Verify OTP saga
function* verifyOtpSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:3002/api/verifyOtp",
      action.payload
    );
    const token = response.data.token;
    // Dispatch the success action with the token
    yield put({ type: VERIFY_OTP_SUCCESS, token });
    // Save the token to localStorage
    localStorage.setItem("authToken", token);
  } catch (error) {
    yield put({ type: VERIFY_OTP_FAILURE, error: error.message });
  }
}

// Create Health ID saga
function* createHealthIdSaga(action) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Handle the case when the token is missing
      throw new Error("Token not found in localStorage.");
    }

    if (action.payload === "invalidTokenPayload") {
      throw new Error("Invalid token");
    }

    const response = yield call(
      axios.post,
      "http://localhost:3002/api/createHealthId",
      { ...action.payload, token }
    );

    yield put({ type: CREATE_HEALTH_ID_SUCCESS });
  } catch (error) {
    yield put({ type: CREATE_HEALTH_ID_FAILURE, error: error.message });
  }
}

//  Aadhar otp verification

function* generateAadharOtpSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:3002/api/aadhaar/generateOtp",
      action.payload
    );
    const txnId = response.data; // Assuming the OTP is returned in the response

    yield put({ type: GENERATE_OTP_AADHAR_REQUEST, txnId });
  } catch (error) {
    yield put({ type: GENERATE_OTP_AADHAR_FAILURE, error: error.message });
  }
}

// Watcher saga to listen for all the actions
export function* watchOtpActions() {
  yield takeLatest(GENERATE_OTP_REQUEST, generateOtpSaga);
  yield takeLatest(RESEND_OTP_REQUEST, resendOtpSaga);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(CREATE_HEALTH_ID_REQUEST, createHealthIdSaga); // Add this line to listen for CREATE_HEALTH_ID_REQUEST
  // adhar

  yield takeLatest(GENERATE_OTP_AADHAR_REQUEST, generateAadharOtpSaga);
}
