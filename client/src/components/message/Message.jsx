import "./message.css";
import { format } from "timeago.js";
import userApi from "../../api/userApi";
import { Avatar, Tooltip } from "@material-ui/core";
const _ = require("lodash");
export default function Message({ message, own }) {
  // console.log(message);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <Tooltip title={message?.user?.fullName}>
          <Avatar
            className="messageImg"
            src={message?.user?.profilePicture || message.profilePicture}
            alt=""
          />
        </Tooltip>
        <div className="messageTopBottom">
          {((message?.Attachments?.length > 0 && message?.Attachments[0]) ||
            message.fileUrl) && (
            <img
              className="messageImage"
              src={
                _.get(message, "Attachments.0.fileUrl", null) ||
                _.get(message, "fileUrl", "")
                // ? PF + user.profilePicture
                // : PF + "person/noAvatar.png"
              }
              alt=""
            />
          )}
          {message.text && <p className="crop messageText">{message.text}</p>}
        </div>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
  // }
}
