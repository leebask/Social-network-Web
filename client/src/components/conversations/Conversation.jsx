import { Avatar } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  console.log(conversation);
  return (
    <div className="conversation">
      <Avatar
        className="conversationImg"
        src={
          conversation?.img
          // ? PF + user.profilePicture
          // : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{conversation?.title}</span>
    </div>
  );
}
