import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./online.css";

export default function Online({ user }) {
  return (
    <Link to="/messenger" style={{ textDecoration: "none" }}>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <Avatar
            className="rightbarProfileImg"
            src={user.profilePicture}
            alt=""
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.fullName}</span>
      </li>
    </Link>
  );
}
