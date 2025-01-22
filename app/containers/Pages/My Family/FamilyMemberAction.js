import axios from "axios";
import {
  SET_FAMILY_MEMBER_LIST_LOADER,
  UPDATE_FAMILY_MEMBERS_LIST,
  UPDATE_LOGGED_IN_USER,
} from "../../../redux/constants/reduxFormConstants";
import moment from "moment";
import { setCookieData } from "../../../components/Common/storageFun";

export const getFamilyMemberList = async (authToken, dispatch) => {
  dispatch({ type: SET_FAMILY_MEMBER_LIST_LOADER, payload: true });
  await axios
    .get(`${process.env.INTERNAL_API_ENDPOINT}/api/users/family`, {
      headers: {
        Authorization: `Bearer ${authToken.access_token}`,
      },
    })
    .then((listResp) => {
      console.log("getFamilyMemberList", listResp);
      if (listResp.status === 200 && listResp.data.success) {
        dispatch({
          type: UPDATE_FAMILY_MEMBERS_LIST,
          payload: listResp.data.data,
        });
      }
      dispatch({ type: SET_FAMILY_MEMBER_LIST_LOADER, payload: false });
    })
    .catch((err) => {
      if (err.response) {
        // Server responded with a status code outside the 2xx range
        console.log("Error response data:", err.response.data); // The response payload
      } else {
        console.log(err);
      }
      dispatch({ type: SET_FAMILY_MEMBER_LIST_LOADER, payload: false });
    });
};

/**Change logged in user */
export const changeLoggedInUser = (user, dispatch) => {
  let expiresOn1 = new Date(moment().add(24, "hours")).toUTCString();
  const userD = {
    dob: user.dob,
    first_name: user.first_name,
    last_name: user.last_name,
    user_id: user.hasOwnProperty("user_id") ? user.user_id : user.id,
    mobile: user.mobile,
  };
  dispatch({ type: UPDATE_LOGGED_IN_USER, payload: userD });
  setCookieData("loggedInUser", JSON.stringify(userD), expiresOn1);
};
