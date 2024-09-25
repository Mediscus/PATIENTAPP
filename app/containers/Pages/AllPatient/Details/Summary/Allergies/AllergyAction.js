import axios from "axios";
import {
  SET_ALLERGY_LIST,
  SET_ALLERGY_SUBSTANCE_LIST,
  SET_EXPOSURE_ROUTE_LIST,
  SET_OCCURANCE_REASON_LIST,
  UPDATE_ALLERGY_LIST_LOADER,
  UPDATE_EXPOSURE_ROUTE_LOADER,
  UPDATE_OCCURANCE_REASON_LOADER,
  UPDATE_SUBSTANCE_LIST_LOADER,
} from "../../../../../../redux/constants/AllergyActionType";


/** fun for get data of allergy list */
export const getAllergyList = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_ALLERGY_LIST_LOADER, payload: true });

    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&semantictag=substance&acceptability=synonyms`
      );
      dispatch({
        type: SET_ALLERGY_LIST,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATE_ALLERGY_LIST_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_ALLERGY_LIST, payload: [] });
      dispatch({ type: UPDATE_ALLERGY_LIST_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_ALLERGY_LIST, payload: [] });
    dispatch({ type: UPDATE_ALLERGY_LIST_LOADER, payload: false });
  }
};

/** fun for get data of allergy list */
export const getNoKnownAllergyList = async (dispatch) => {
  dispatch({ type: UPDATE_ALLERGY_LIST_LOADER, payload: true });
  const URL = `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/explore/children?id=716186003`;

  try {
    const getResponse = await axios.get(URL);
    dispatch({
      type: SET_ALLERGY_LIST,
      payload: getResponse.data || [],
    });
    dispatch({ type: UPDATE_ALLERGY_LIST_LOADER, payload: false });
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch({ type: SET_ALLERGY_LIST, payload: [] });
    dispatch({ type: UPDATE_ALLERGY_LIST_LOADER, payload: false });
  }
};

/**fun for get data of substance list */
export const getSubstanceList = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_SUBSTANCE_LIST_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&semantictag=substance&acceptability=synonyms`
      );
      dispatch({
        type: SET_ALLERGY_SUBSTANCE_LIST,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATE_SUBSTANCE_LIST_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_ALLERGY_SUBSTANCE_LIST, payload: [] });
      dispatch({ type: UPDATE_SUBSTANCE_LIST_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_ALLERGY_SUBSTANCE_LIST, payload: [] });
    dispatch({ type: UPDATE_SUBSTANCE_LIST_LOADER, payload: false });
  }
};

/***fun for allergy occurance reason */
export const getClinicalFindingList = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_OCCURANCE_REASON_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&semantictag=finding&acceptability=synonyms`
      );
      dispatch({
        type: SET_OCCURANCE_REASON_LIST,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATE_OCCURANCE_REASON_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_OCCURANCE_REASON_LIST, payload: [] });
      dispatch({ type: UPDATE_OCCURANCE_REASON_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_OCCURANCE_REASON_LIST, payload: [] });
    dispatch({ type: UPDATE_OCCURANCE_REASON_LOADER, payload: false });
  }
};

/***fun for allergy occurance reason */
export const getExposureRouteList = async (dispatch, ipValue) => {
  if (ipValue && ipValue.length !== 0) {
    dispatch({ type: UPDATE_EXPOSURE_ROUTE_LOADER, payload: true });
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_DATASET_API_ENDPOINT}/api/search/search?term=${ipValue}&state=active&acceptability=synonyms&parentid=284009009`
      );
      dispatch({
        type: SET_EXPOSURE_ROUTE_LIST,
        payload: getResponse.data || [],
      });
      dispatch({ type: UPDATE_EXPOSURE_ROUTE_LOADER, payload: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: SET_EXPOSURE_ROUTE_LIST, payload: [] });
      dispatch({ type: UPDATE_EXPOSURE_ROUTE_LOADER, payload: false });
    }
  } else {
    dispatch({ type: SET_EXPOSURE_ROUTE_LIST, payload: [] });
    dispatch({ type: UPDATE_EXPOSURE_ROUTE_LOADER, payload: false });
  }
};
