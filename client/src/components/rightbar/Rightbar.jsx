import "./rightbar.css";
import Online from "../online/Online";
import userSlice, {
  friendSelector,
  userSelector,
} from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { Avatar } from "@material-ui/core";

export default function Rightbar({ user }) {
  const dispatch = useDispatch();
  let friendsCur = useSelector(friendSelector);
  let currentUser = useSelector(userSelector);
  const [followed, setFollowed] = useState(false);
  const [friends, setFriends] = useState(false);
  const handleClick = async () => {
    try {
      if (followed) {
        await userApi.unfollow(user.id);
        dispatch(userSlice.actions.unfollow(user.id));
      } else {
        await userApi.follow(user.id);
        dispatch(userSlice.actions.follow(user));
      }
      // setFollowed(!followed);
    } catch (err) {}
  };

  useEffect(() => {
    let check = friendsCur.map((f) => f.id).includes(user?.id);
    setFollowed(check);
  }, [friendsCur, user?.id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await userApi.getFriends(user.username);
        // console.log(res.data);
        setFriends(res.data);
      } catch (err) {}
    };
    getFriends();
  }, [user]);
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src="https://res.cloudinary.com/dzens2tsj/image/upload/v1662131052/gift_ylzqt4.png"
            alt=""
          />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img
          className="rightbarAd"
          src="https://res.cloudinary.com/dzens2tsj/image/upload/v1662131032/ad_i4lplt.png"
          alt=""
        />

        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friendsCur.map((u) => (
            <Online key={u.followedId} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.id !== currentUser.id && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Description:</span>
            <span className="rightbarInfoValue">{user?.description}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Address:</span>
            <span className="rightbarInfoValue">{user?.address}</span>
          </div>
          {/* <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div> */}
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends &&
            friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
                key={friend.username}
              >
                <div className="rightbarFollowing">
                  <Avatar
                    src={friend.profilePicture}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.fullName}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
