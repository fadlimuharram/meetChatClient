import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Chats from "../screens/Chats/";
import withSocket from "../hoc/WithSocket";
import withAuth from "../hoc/WithAuth";

const enhancee = compose(
  withSocket,
  withAuth
);

export default enhancee(Chats);
