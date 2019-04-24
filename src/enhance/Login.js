import React from "react";
import Login from "../screens/Login";
import { connect } from "react-redux";
import { login } from "../_redux/actions";

export default connect(
  "",
  { login }
)(Login);
