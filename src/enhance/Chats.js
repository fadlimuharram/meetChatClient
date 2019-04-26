import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Chats from "../screens/Chats/";
import withSocket from "../hoc/WithSocket";
import withAuth from "../hoc/WithAuth";
import { getMessagesConnections } from "../_redux/actions";

const mapStateToProps = state => {
  return {
    connections: state.messages.connections,
    isLoading: state.messages.isLoading
  };
};

const enhancee = compose(
  withSocket,
  withAuth,
  connect(
    mapStateToProps,
    { getMessagesConnections }
  )
);

export default enhancee(Chats);
