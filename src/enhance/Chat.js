import React from "react";
import Chat from "../screens/Chat";
import withSocket from "../hoc/WithSocket";
import withAuth from "../hoc/WithAuth";

const enhance = compose(
  withAuth,
  withSocket
);

export default enhance(Chat);
