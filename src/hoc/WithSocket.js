import React from "react";
import SocketContext from "../SocketContext";

export default WrappedComponent => {
  class HOC extends React.Component {
    render() {
      return (
        <SocketContext.Consumer>
          {socket => <WrappedComponent {...this.props} socket={socket} />}
        </SocketContext.Consumer>
      );
    }
  }
  return HOC;
};
