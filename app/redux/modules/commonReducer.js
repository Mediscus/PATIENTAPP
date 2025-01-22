import { UPDATE_SNACKBAR_ALERT_STATE } from "../constants/reduxFormConstants";

const initialState = {
  isSnackbarAlert: {
    open: false,
    type: "success",
    msg: "",
  },
};

function commonReducer(state = initialState, action) {
  if (action.type === "undefined") {
    return state;
  }

  switch (action.type) {
    case UPDATE_SNACKBAR_ALERT_STATE:
      return {
        ...state,
        isSnackbarAlert: action.payload,
      };

    default:
      return state;
  }
}

export default commonReducer;
