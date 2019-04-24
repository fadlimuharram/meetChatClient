import { friendsConstants } from "../_constants";
import { api_url } from "react-native-dotenv";
import axios from "axios";
const { RECOMMENDATIONS_FRIEND } = friendsConstants;
const full_uri = api_url + "users/";

export const getRecommendation = token => dispatch => {
  dispatch({
    type: RECOMMENDATIONS_FRIEND,
    payload: axios.get(full_uri + "recommendation", {
      headers: {
        Authorization: token
      }
    })
  });
};
