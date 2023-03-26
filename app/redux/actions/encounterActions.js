import { ADD_ENCOUNTER, CLEAR_ENCOUNTER, REMOVE_ENCOUNTER } from '../constants/reduxFormConstants';

export const addEncounter = (data) => ({
  type: ADD_ENCOUNTER, data
});

export const removeEncounter = (data) => ({
  type: REMOVE_ENCOUNTER, data
});

export const clearEncounter = () => ({
  type: CLEAR_ENCOUNTER
});

