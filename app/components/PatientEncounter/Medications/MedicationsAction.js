import axios from "axios";
import {
  SET_Medication_Name,
  UPDATE_Medication_Name_LOADER,
  SET_CONDITION,
  UPDATE_CONDITION_LOADER,
  SET_ROUTE,
  UPDATED_ROUTE_LOADER,
  SET_MEDICATION_METHOD,
  UPDATE_METHOD_LOADER,
} from "./../../../redux/constants/MedicationActionType";

//api/search/search?term=vaccine&state=active&semantictag=clinical%20drug++real%20clinical%20drug&acceptability=synonyms

// api/search/search?term=dolo&state=active&semantictag=clinical%20drug++real%20clinical%20drug&acceptability=synonyms

export const getmedicationName = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_Medication_Name_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&semantictag=clinical%20drug++real%20clinical%20drug&acceptability=synonyms`
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

export const getDeasesName = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_CONDITION_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&semantictag=disorder&acceptability=synonyms`
      );
      dispatch({
        type: SET_CONDITION,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATE_CONDITION_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_CONDITION, payload: [] });
      dispatch({ type: UPDATE_CONDITION_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_CONDITION, payload: [] });
    dispatch({ type: UPDATE_CONDITION_LOADER, payload: false });
  }
};

export const getRouteList = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATED_ROUTE_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&acceptability=synonyms&parentid=284009009`
      );
      dispatch({
        type: SET_ROUTE,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATED_ROUTE_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_ROUTE, payload: [] });
      dispatch({ type: UPDATED_ROUTE_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_ROUTE, payload: [] });
    dispatch({ type: UPDATED_ROUTE_LOADER, payload: false });
  }
};

export const getMethodList = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_METHOD_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&acceptability=synonyms&parentid=422096002`
      );
      dispatch({
        type: SET_MEDICATION_METHOD,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATE_METHOD_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_MEDICATION_METHOD, payload: [] });
      dispatch({ type: UPDATE_METHOD_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_MEDICATION_METHOD, payload: [] });
    dispatch({ type: UPDATE_METHOD_LOADER, payload: false });
  }
};
