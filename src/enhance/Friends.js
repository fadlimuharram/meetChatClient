import React from "react";
import Friends from "../screens/Friends";
import { connect } from "react-redux";
import { compose } from "redux";
import { getRecommendation } from "../_redux/actions";
import withAuth from "../hoc/WithAuth";

const mapStateToProps = state => {
  return {
    recommendations: state.friends.recommendations.data,
    isLoading: state.friends.isLoading
  };
};

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    { getRecommendation }
  )
);

export default enhance(Friends);
