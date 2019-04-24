import React from "react";
import Profile from "../screens/Profile";
import { connect } from "react-redux";
import { logout } from "../_redux/actions";

export default connect(
  "",
  { logout }
)(Profile);
