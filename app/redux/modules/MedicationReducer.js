import {
  SET_Medication_Name,
  UPDATE_Medication_Name_LOADER,
  SET_CONDITION,
  UPDATE_CONDITION_LOADER,
  SET_ROUTE,
  UPDATED_ROUTE_LOADER,
  SET_MEDICATION_METHOD,
  UPDATE_METHOD_LOADER,
} from "./../constants/MedicationActionType";

const initialState = {
  medicationname: [],
  medicationnameLoader: false,
  deasesname: [],
  updateDeasesLoder: false,
  medicationroute: [],
  updateMedicationLoader: false,
  medicationmethod: [],
  updateMethodLoader: false,
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
    case SET_CONDITION:
      return {
        ...state,
        deasesname: action.payload,
      };
    case UPDATE_CONDITION_LOADER:
      return {
        ...state,
        updateDeasesLoder: action.payload,
      };
    case SET_CONDITION:
      return {
        ...state,
        deasesname: action.payload,
      };
    case UPDATE_CONDITION_LOADER:
      return {
        ...state,
        updateDeasesLoder: action.payload,
      };
    case SET_ROUTE:
      return {
        ...state,
        medicationroute: action.payload,
      };
    case UPDATED_ROUTE_LOADER:
      return {
        ...state,
        updateMedicationLoader: action.payload,
      };
    case SET_ROUTE:
      return {
        ...state,
        medicationroute: action.payload,
      };
    case UPDATED_ROUTE_LOADER:
      return {
        ...state,
        updateMedicationLoader: action.payload,
      };
    case SET_MEDICATION_METHOD:
      return {
        ...state,
        medicationmethod: action.payload,
      };
    case UPDATE_METHOD_LOADER:
      return {
        ...state,
        updateMethodLoader: action.payload,
      };
    default:
      return state;
  }
}

export default MedicationReducer;
