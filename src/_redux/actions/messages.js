import { messageConstants } from "../_constants";
import { api_url } from "react-native-dotenv";
import axios from "axios";
const { MESSAGES, MESSAGE_CONNECTION } = messageConstants;

const full_uri = api_url + "messages";

export const getAllMessages = (token, receiver) => dispatch => {
  dispatch({
    type: MESSAGES,
    payload: axios.get(full_uri + `/${receiver}`, {
      headers: {
        Authorization: token
      }
    })
  });
};

export const getMessagesConnections = token => dispatch => {
  dispatch({
    type: MESSAGE_CONNECTION,
    payload: axios.get(full_uri + "/connection", {
      headers: {
        Authorization: token
      }
    })
  });
};
