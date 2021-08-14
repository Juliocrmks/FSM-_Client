import React, { useEffect, Fragment, useState } from "react";
import { GET_MESSAGES, SEND_MESSAGE } from "../utils/graphql";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { Col, Form } from "react-bootstrap";
import { useMessageDispatch, useMessageState } from "../context/message";
import Message from "../components/Message";
import { StepContent } from "semantic-ui-react";

export default function Messages() {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();

  const selectedUser = users?.find((user) => user.selected === true);
  const messages = selectedUser?.messages;

  const [content, setContent] = useState("");

  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: selectedUser.username,
          message: data.sendMessage,
        },
      });
    },
  });

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);

  const submitMessage = (e) => {
    e.preventDefault();
    if (content === "" && !selectedUser) {
      return;
    }
    setContent("");
    sendMessage({ variables: { to: selectedUser.username, content } });
  };

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = (
      <p className="info-text">Select a chat to start chatting!</p>
    );
  } else if (messagesLoading) {
    selectedChatMarkup = <p className="info-text">Loading...</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message, index) => (
      <Fragment key={message.id}>
        <Message message={message} />
        {index === messages.length - 1 && (
          <div className="invisible">
            <hr className="m-0" />
          </div>
        )}
      </Fragment>
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = <p className="info-text">Send your first message!</p>;
  }
  return (
    <Col xs={10} md={8}>
      <div className="messages-box d-flex flex-column-reverse">
        {selectedChatMarkup}
      </div>
      {selectedUser && (
        <Form onSubmit={submitMessage}>
          <Form.Group className="d-flex align-items-center">
            <Form.Control
              type="text"
              className="message-input p-3 rounded-pill bg-secondary border-0 mr-3"
              placeholder="Send a message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="ml-2">
              <i
                className="fas fa-paper-plane fa-2x text-primary justify-content-end"
                role="button"
                onClick={submitMessage}
              ></i>
            </div>
          </Form.Group>
        </Form>
      )}
    </Col>
  );
}
