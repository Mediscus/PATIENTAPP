import {
  SET_Medication_Name,
  UPDATE_Medication_Name_LOADER,
} from "./../constants/MedicationActionType";

const initialState = {
  medicationname: [],
  medicationnameLoader: false,
};

function MedicationReducer(state = initialState, action) {
  if (action.type === "undefined") {
    return state;
  }

  switch (action.type) {
    case SET_Medication_Name:
      return {
        ...state,
        medicationname: action.payload,
      };
    case UPDATE_Medication_Name_LOADER:
      return {
        ...state,
        medicationnameLoader: action.payload,
      };
    default:
      return state;
  }
}

export default MedicationReducer;
