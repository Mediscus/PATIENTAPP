
import { ADD_ENCOUNTER, REMOVE_ENCOUNTER, CLEAR_ENCOUNTER } from '../constants/reduxFormConstants';

const initialState = {
  encounters: [],
};


function encounters(state = initialState, action) {
  switch (action.type) {
    case ADD_ENCOUNTER:
      let item = state.encounters.find(item => item.appointment_id == action.data.appointment_id);
      let newEncounter = state.encounters.filter(item => item.appointment_id != action.data.appointment_id);
      item = action.data;
      newEncounter.push(item);
      return {
        ...state,
        encounters: newEncounter,
      }

    case REMOVE_ENCOUNTER:
      return {
        ...state,
        encounters: state.encounters.filter(item => item.appointment_id != action.data.appointment_id),
      };

    case CLEAR_ENCOUNTER:
      return {
        encounters: [],
      };

    default:
      return state;
  }
}

export default encounters;