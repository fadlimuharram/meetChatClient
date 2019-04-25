import { userConstants } from "../_constants";
import { api_url } from "react-native-dotenv";
import axios from "axios";

const { LOGIN, REGISTER, LOGOUT, COVER } = userConstants;

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

export const cover = (photo, token) => dispatch => {
  const data = new FormData();
  data.append("cover", {
    ...photo,
    name: "image" + ".jpg",
    type: "image/jpeg"
  });

  dispatch({
    type: COVER,
    payload: axios.patch(full_uri + "cover", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token
      }
    })
  });

  // fetch(full_uri + "cover", {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     Authorization: token
  //   },
  //   body: data
  // })
  //   .then(res => {
  //     return res.json();
  //     // console.log(res.data);
  //     // alert(JSON.stringify(res.data, null, 2));
  //   })
  //   .then(res => {
  //     console.log(res.data);
  //     alert(JSON.stringify(res.data, null, 2));
  //   })
  //   .catch(e => {
  //     console.log("err-->>", e);
  //     alert(JSON.stringify(e, null, 2));
  //   });

  // dispatch({
  //   type:
  // })
};
