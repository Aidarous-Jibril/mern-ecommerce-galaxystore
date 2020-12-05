import React from "react";
import { Alert } from "react-bootstrap";

const MessageContainer = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

MessageContainer.defaultProps = {
  variant: "info",
};

export default MessageContainer;
