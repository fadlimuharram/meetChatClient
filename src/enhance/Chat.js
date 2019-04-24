import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getAllMessages } from "../_redux/actions";
import Chat from "../screens/Chat";
import withSocket from "../hoc/WithSocket";
import withAuth from "../hoc/WithAuth";

const mapStateToProps = state => {
  return {
    messages: state.messages.data,
    isLoading: state.messages.isLoading,
    user_id: state.users.data.id
  };
};

const enhance = compose(
  withSocket,
  withAuth,
  connect(
    mapStateToProps,
    { getAllMessages }
  )
);

export default enhance(Chat);
