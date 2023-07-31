
import { SET_PATIENT, RESET_PATIENT } from '../constants/reduxFormConstants';

const initialState = {
  patient: {},
};

function patients(state = initialState, action) {
  switch (action.type) {
    case SET_PATIENT:
      return {
        patient: action.data,
      }

    case RESET_PATIENT:
      return {
        patient: action.data,
      };

    default:
      return state;
  }
}

export default patients;