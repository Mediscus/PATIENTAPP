import {
  SET_DIAGNOSIS_BODY_SITE_LIST,
  SET_DIAGNOSIS_LIST,
  UPDATE_DIAGNOSIS_BODY_SITE_LIST_LOADER,
  UPDATE_DIAGNOSIS_LIST_LOADER,
} from "../constants/DiagnosisActionType";

const initialState = {
  diagnosisList: [],
  diagnosisListLoader: false,
  bodySiteList: [],
  bodySiteListLoader: false,
};

function DiagnosisReducer(state = initialState, action) {
  if (action.type === "undefined") {
    return state;
  }

  switch (action.type) {
    case SET_DIAGNOSIS_LIST:
      return {
        ...state,
        diagnosisList: action.payload,
      };
    case UPDATE_DIAGNOSIS_LIST_LOADER:
      return {
        ...state,
        diagnosisListLoader: action.payload,
      };
    case SET_DIAGNOSIS_BODY_SITE_LIST:
      return {
        ...state,
        bodySiteList: action.payload,
      };
    case UPDATE_DIAGNOSIS_BODY_SITE_LIST_LOADER:
      return {
        ...state,
        bodySiteListLoader: action.payload,
      };

    default:
      return state;
  }
}

export default DiagnosisReducer;
