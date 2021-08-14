import React from "react";
import { Row } from "react-bootstrap";
import Users from "../components/Users";
import Messages from "../components/Messages";

function MessagingScene() {
  return (
    <>
      <Row className="bg-white">
        <Users />
        <Messages />
      </Row>
    </>
  );
}

export default MessagingScene;
