import axios from "axios";
import {
  SET_VACCINE_CODE,
  UPDATE_VACCINE_CODE_LOADER,
} from "../../../../../../redux/constants/VaccionationActionType";

export const getVaccineCode = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_VACCINE_CODE_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=vaccine&state=active&semantictag=clinical%20drug++real%20clinical%20drug&acceptability=synonyms`
      );
      dispatch({
        type: SET_VACCINE_CODE,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATE_VACCINE_CODE_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_VACCINE_CODE, payload: [] });
      dispatch({ type: UPDATE_VACCINE_CODE_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_VACCINE_CODE, payload: [] });
    dispatch({ type: UPDATE_VACCINE_CODE_LOADER, payload: false });
  }
};
