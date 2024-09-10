import axios from "axios";
import { useEffect, useState } from "react";

export const useDropDownValues = (apiParams) => {
  const [values, setValues] = useState([]);
  const fetchDropDownValues = async () => {
    try {
      const getResponse = await axios.get(
        `${process.env.SNOMED_API_ENDPOINT}${apiParams}`
      );
      console.log(apiParams, getResponse);

      if (getResponse.hasOwnProperty("data")) {
        setValues(getResponse.data.expansion.contains);
      } else {
        setValues([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDropDownValues();
  }, []);

  return values;
};
