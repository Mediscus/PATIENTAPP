import {
  SET_VACCINE_CODE,
  UPDATE_VACCINE_CODE_LOADER,
} from "../constants/VaccionationActionType";

const initialState = {
  vaccineCodeList: [],
  vaccineCodeLoder: false,
};

function VaccinationReducer(state = initialState, action) {
  if (action.type === "undefined") {
    return state;
  }

  switch (action.type) {
    case SET_VACCINE_CODE:
      return {
        ...state,
        vaccineCodeList: action.payload,
      };
    case UPDATE_VACCINE_CODE_LOADER:
      return {
        ...state,
        vaccineCodeLoder: action.payload,
      };

    default:
      return state;
  }
}

export default VaccinationReducer;
