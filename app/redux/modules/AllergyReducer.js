import {
  SET_ALLERGY_LIST,
  SET_ALLERGY_SUBSTANCE_LIST,
  SET_EXPOSURE_ROUTE_LIST,
  SET_NO_KNOWN_ALLERGY,
  SET_OCCURANCE_REASON_LIST,
  UPDATE_ALLERGY_LIST_LOADER,
  UPDATE_EXPOSURE_ROUTE_LOADER,
  UPDATE_OCCURANCE_REASON_LOADER,
  UPDATE_SUBSTANCE_LIST_LOADER,
} from "../constants/AllergyActionType";

const initialState = {
  allergyList: [],
  allergyListLoader: false,
  substanceList: [],
  substanceListLoader: false,
  occuranceReasonList: [],
  occuranceListLoader: false,
  exposureRouteList: [],
  exposureRouteListLoader: false,
  isNoKnownAllergy: false,
};

function AllergyReducer(state = initialState, action) {
  if (action.type === "undefined") {
    return state;
  }

  switch (action.type) {
    case SET_ALLERGY_LIST:
      return {
        ...state,
        allergyList: action.payload,
      };
    case UPDATE_ALLERGY_LIST_LOADER:
      return {
        ...state,
        allergyListLoader: action.payload,
      };
    case SET_ALLERGY_SUBSTANCE_LIST:
      return {
        ...state,
        substanceList: action.payload,
      };
    case UPDATE_SUBSTANCE_LIST_LOADER:
      return {
        ...state,
        substanceListLoader: action.payload,
      };
    case SET_OCCURANCE_REASON_LIST:
      return {
        ...state,
        occuranceReasonList: action.payload,
      };
    case UPDATE_OCCURANCE_REASON_LOADER:
      return {
        ...state,
        occuranceListLoader: action.payload,
      };
    case SET_EXPOSURE_ROUTE_LIST:
      return {
        ...state,
        exposureRouteList: action.payload,
      };
    case UPDATE_EXPOSURE_ROUTE_LOADER:
      return {
        ...state,
        exposureRouteListLoader: action.payload,
      };
    case SET_NO_KNOWN_ALLERGY:
      return {
        ...state,
        isNoKnownAllergy: action.payload,
      };

    default:
      return state;
  }
}

export default AllergyReducer;
