import React from "react";
import { useQuery, } from "@apollo/react-hooks";
import { Col, Image } from "react-bootstrap";
import { GET_USERS } from "../utils/graphql";
import { useMessageDispatch, useMessageState } from "../context/message";
import classNames from "classnames";

function Users() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((user) => user.selected === true)?.username;
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let usersMarkup;
  if (!users || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => {
      const selected = selectedUser === user.username;
      return (
        <div
          role="button"
          className={classNames("user-div d-flex justify-content-md-start p-3", {
            "bg-white": selected,
          })}
          key={user.username}
          onClick={() =>
            dispatch({ type: "SET_SELECTED_USER", payload: user.username })
          }
        >
          <Image
            src={
              user.imageUrl ||
              "https://www.unicef.org/chile/sites/unicef.org.chile/files/styles/hero_desktop/public/Bodoque.PNG?itok=BbVmmHu-"
            }
            className="user-image ml-2 "
          />
          <div
          classNam="d-none d-md-block"
            style={{
              paddingLeft: "1rem",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <p className="text-success">{user.username}</p>
            <p style={{ marginTop: "auto" }} className="font-weight-light">
              {user.latestMessage
                ? user.latestMessage.content
                : "You are now connected!"}
            </p>
          </div>
        </div>
      );
    });
  }
  return (
    <Col xs={2} md={4} className="users-box p-0 bg-secondary">
      {usersMarkup}
    </Col>
  );
}
export default Users;
