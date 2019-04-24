import { userConstants } from "../_constants";
import { api_url } from "react-native-dotenv";
import axios from "axios";
const { LOGIN, REGISTER, LOGOUT } = userConstants;

const full_uri = api_url + "users/";

export const login = (email, password) => dispatch => {
  dispatch({
    type: LOGIN,
    payload: axios.post(api_url + "login", { email, password })
  });
};

export const register = data => dispatch => {
  dispatch({
    type: REGISTER,
    payload: axios.post(api_url + "register", data)
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
