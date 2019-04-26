import { messageConstants } from "../_constants";
const INITIAL_STATE = {
  data: [],
  isLoading: false,
  connections: []
};

const { MESSAGES, MESSAGE_CONNECTION } = messageConstants;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGES + "_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data
      };
    case MESSAGES + "_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case MESSAGE_CONNECTION + "_FULFILLED":
      return {
        ...state,
        isLoading: false,
        connections: action.payload.data.data
      };
    default:
      return state;
  }
};
