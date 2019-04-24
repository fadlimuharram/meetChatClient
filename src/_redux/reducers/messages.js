import { messageConstants } from "../_constants";
const INITIAL_STATE = {
  data: [],
  isLoading: false
};

const { MESSAGES } = messageConstants;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGES + "_FULFILLED":
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload.data.data
      };
    case MESSAGES + "_PENDING":
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
