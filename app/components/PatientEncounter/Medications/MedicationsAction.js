import axios from "axios";

import {
  SET_Medication_Name,
  UPDATE_Medication_Name_LOADER,
} from "./../../../redux/constants/MedicationActionType";

///api/search/search?term=vaccine&state=active&semantictag=clinical%20drug++real%20clinical%20drug&acceptability=synonyms

export const getmedicationName = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_Medication_Name_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&semantictag=disorder&acceptability=synonyms`
      );
      dispatch({
        type: SET_Medication_Name,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATE_Medication_Name_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_Medication_Name, payload: [] });
      dispatch({ type: UPDATE_Medication_Name_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_Medication_Name, payload: [] });
    dispatch({ type: UPDATE_Medication_Name_LOADER, payload: false });
  }
};
