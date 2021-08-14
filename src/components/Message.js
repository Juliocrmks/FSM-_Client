import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import classNames from "classnames";
import moment from "moment";

function Message({ message }) {
  const { user } = useContext(AuthContext);
  const sent = message.from === user.username;
  const recieved = !sent;
  return (
    <OverlayTrigger
      placement={sent ? "right" : "left"}
      overlay={
        <Tooltip>
          {moment(message.createdAt).format("MMMM DD, YYYY @ h:mm a")}
        </Tooltip>
      }
    >
      <div
        className={classNames("d-inline-flex my-3", {
          "ml-auto justify-content-end": sent,
          "mr-auto": recieved,
        })}
      >
        <div
          className={classNames("py-2 px-3 rounded-pill", {
            "bg-primary": sent,
            "bg-secondary": recieved,
          })}
        >
          <p className={classNames({ "text-white": sent })}>
            {message.content}
          </p>
        </div>
      </div>
    </OverlayTrigger>
  );
}

export default Message;
