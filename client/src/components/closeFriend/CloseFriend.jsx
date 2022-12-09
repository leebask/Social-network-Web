import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({ user }) {
  return (
    <Link to={`/profile/${user.username}`}>
      <li className="sidebarFriend">
        <Avatar className="sidebarFriendImg" src={user.profilePicture} alt="" />
        <span className="sidebarFriendName">{user.fullName}</span>
      </li>
    </Link>
  );
}
