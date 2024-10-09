import axios from "axios";
import {
  SET_DIAGNOSIS_BODY_SITE_LIST,
  SET_DIAGNOSIS_LIST,
  UPDATE_DIAGNOSIS_BODY_SITE_LIST_LOADER,
  UPDATE_DIAGNOSIS_LIST_LOADER,
} from "../../../redux/constants/DiagnosisActionType";

/***fun for allergy occurance reason */
export const getDiagnosisList = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_DIAGNOSIS_LIST_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&acceptability=synonyms&parentid=404684003`
      );
      dispatch({
        type: SET_DIAGNOSIS_LIST,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATE_DIAGNOSIS_LIST_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_DIAGNOSIS_LIST, payload: [] });
      dispatch({ type: UPDATE_DIAGNOSIS_LIST_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_DIAGNOSIS_LIST, payload: [] });
    dispatch({ type: UPDATE_DIAGNOSIS_LIST_LOADER, payload: false });
  }
};

/***fun for allergy occurance reason */
export const getBodySite = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_DIAGNOSIS_BODY_SITE_LIST_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&acceptability=synonyms&parentid=442083009`
      );
      dispatch({
        type: SET_DIAGNOSIS_BODY_SITE_LIST,
        payload: getResponse.data || [],
      });
      dispatch({
        type: UPDATE_DIAGNOSIS_BODY_SITE_LIST_LOADER,
        payload: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_DIAGNOSIS_BODY_SITE_LIST, payload: [] });
      dispatch({
        type: UPDATE_DIAGNOSIS_BODY_SITE_LIST_LOADER,
        payload: false,
      });
    }
  } else {
    dispatch({ type: SET_DIAGNOSIS_BODY_SITE_LIST, payload: [] });
    dispatch({ type: UPDATE_DIAGNOSIS_BODY_SITE_LIST_LOADER, payload: false });
  }
};
