import { Close, MoreVert, Edit } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./comment.css";
import postApi from "../../api/postApi";
import { CommentModal } from "./CommentModal";
import { Avatar, Button, CircularProgress, Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { format } from "timeago.js";
import { notify } from "../../utility/toast";

export default function Comment({
  comments,
  setComments,
  handleSubmit,
  user,
  handleClickShowMore,
  length,
  setLength,
}) {
  // const user = useSelector(userSelector);
  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState({});
  const [newComment, setNewComment] = useState("");
  // useEffect(() => {
  //   const getFriends = async () => {
  //     const res = await axios.get("/users/friends/" + currentId);
  //     setFriends(res.data);
  //   };
  const editComment = async (commentId, text) => {
    try {
      const res = await postApi.editComment(commentId, { text });
      let edit = comments.find((comment) => comment.id === commentId);
      edit.text = text;

      setIsShow(false);
    } catch (err) {}
  };
  const handleRemoveComment = async (commentId, text) => {
    try {
      const res = await postApi.deleteComment(commentId);
      notify("Xoá bình luận thành công");
      setComments(comments.filter((comment) => comment.id !== commentId));
      setLength(length - 1);
    } catch (err) {}
  };

  const detailComment =
    comments?.length > 0 &&
    comments.map((c) => (
      <div key={c.id} className="commentCenter">
        <Avatar
          className="commentOwnerImg"
          src={c?.user?.profilePicture}
          alt=""
        />
        <div className="commentCenterBottom">
          <h4 className="commentOwner">{c?.user?.fullName}</h4>
          <div className="commentCenterBottomRight">
            <p className="crop">
              {comment.id !== c.id ? c?.text : comment.text}
            </p>

            {user?.id === c?.user?.id && (
              <div className="commentOption">
                <div
                  className="editButton"
                  onClick={() => {
                    setIsShow(true);
                    setComment(c);
                  }}
                >
                  <Tooltip title="Sửa bình luận">
                    <Edit style={{ fontSize: "15px" }} />
                  </Tooltip>
                </div>
                <div
                  className="removeButton"
                  onClick={() => handleRemoveComment(c.id)}
                >
                  <Tooltip title="Xóa bình luận">
                    <Close style={{ fontSize: "15px" }} />
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
          <div className="messageBottom">{format(c?.createdAt)}</div>
        </div>
      </div>
    ));
  return (
    <div className="commentWrapper">
      <div className="commentTop">
        <img className="commentImg" src={user?.profilePicture} alt="" />
        <input
          className="commentInput"
          type="text"
          placeholder="Viết bình luận ở đây"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          color="primary"
          size="small"
          onClick={() => {
            handleSubmit(newComment);
            setNewComment("");
          }}
        >
          Gửi
        </Button>
      </div>
      <hr className="commentHr"></hr>
      {detailComment}
      {comments?.length % 5 === 0 && comments?.length !== 0 && (
        <div className="showMoreBtn" onClick={handleClickShowMore}>
          <p>Xem thêm</p>
        </div>
      )}
      {isShow && (
        <CommentModal
          comment={comment}
          setComment={setComment}
          editComment={editComment}
          setIsShow={setIsShow}
        />
      )}
    </div>
  );
}
