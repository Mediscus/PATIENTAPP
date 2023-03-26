import { RESET_PATIENT, SET_PATIENT } from '../constants/reduxFormConstants';

export const setPatient = (data) => ({
  type: SET_PATIENT, data
});

export const resetPatient = (data) => ({
  type: RESET_PATIENT, data
});

