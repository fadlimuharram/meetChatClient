import { friendsConstants } from "../_constants";

const { RECOMMENDATIONS_FRIEND } = friendsConstants;

const INITIAL_STATE = {
  recommendations: [],
  isLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECOMMENDATIONS_FRIEND + "_FULFILLED":
      return {
        ...this.state,
        isLoading: false,
        recommendations: action.payload.data
      };

    case RECOMMENDATIONS_FRIEND + "_PENDING":
      return {
        ...this.state,
        isLoading: true
      };
    default:
      return state;
  }
};
