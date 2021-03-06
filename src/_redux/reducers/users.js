import { userConstants } from "../_constants";

const { LOGIN, REGISTER, LOGOUT, COVER } = userConstants;

const INITIAL_STATE = {
  data: {},
  access_token: {},
  isLoggedIn: false,
  isLoading: false,
  error: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN + "_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case LOGIN + "_FULFILLED":
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload.data.data,
        access_token: action.payload.data.access_token,
        isLoggedIn: true
      };
    case LOGIN + "_REJECTED":
      return {
        ...state,
        ...INITIAL_STATE
      };
    case COVER + "_PENDING":
      // alert(JSON.stringify(action.payload.data));
      return {
        ...state,
        isLoading: true
      };
    case COVER + "_FULFILLED":
      // alert(JSON.stringify(action.payload.data));
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.user
      };

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
