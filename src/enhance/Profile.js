import React from "react";
import Profile from "../screens/Profile";
import { compose } from "redux";
import { connect } from "react-redux";
import { logout, cover } from "../_redux/actions";
import withAuth from "../hoc/WithAuth";

const mapStateToProps = state => {
  return {
    isLoading: state.users.isLoading
  };
};
const enhance = compose(
  withAuth,
  connect(
    "",
    { logout, cover }
  )
);

export default enhance(Profile);
