import React, { useEffect, useContext } from "react";
import { Row } from "react-bootstrap";
import Users from "../components/Users";
import Messages from "../components/Messages";
import { useSubscription, gql } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { useMessageDispatch } from "../context/message";

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      id
      from
      to
      content
      createdAt
    }
  }
`

function MessagingScene() {

  const dispatch = useMessageDispatch();
  const { user } = useContext(AuthContext);


  const { data: messageData, error: messageError } =
    useSubscription(NEW_MESSAGE);
  console.log(messageData)

  useEffect(() => {
    
    if (messageError) console.log(messageError);
    if (messageData) {
     
      const message = messageData.newMessage
      console.log('venom,',message)
      const otherUser = user.username === message.to ?message.from : message.to
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: otherUser,
          message:message,
        },
      });
    }
  }, [messageError, messageData]);// eslint-disable-line react-hooks/exhaustive-deps

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
