import "./post.css";
import { Close, Remove, Add, Edit, Report } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Comment from "../comment/Comment";
import { PostModal } from "./PostModal";
import postApi from "../../api/postApi";
import userSlice, {
  friendSelector,
  userSelector,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/userApi";
import Tooltip from "@mui/material/Tooltip";
import { notify } from "../../utility/toast";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { Avatar } from "@mui/material";
import { format } from "timeago.js";

const Post = forwardRef(({ post, posts, setPosts }, ref) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ ...post });
  const user = useSelector(userSelector);
  const friends = useSelector(friendSelector);
  const [like, setLike] = useState(data?.numLike || 0);
  const [comments, setComments] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postObj, setPostObj] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(0);
  const [editText, setEditText] = useState(post?.description);

  useEffect(() => {
    setData({ ...post });
    setEditText(post?.description);
    setFollowed(friends.map((item) => item.id).includes(post?.userId));
    setLike(post?.numLike);
  }, [post, friends]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await postApi.getComments({
          postId: currentPost,
          params: {
            page,
            limit: 5,
          },
        });
        setComments([...comments, ...res.data]);
        setLength(res.length);
      } catch (err) {}
    };
    if (isComment) getComments();
  }, [currentPost, page]);

  useEffect(() => {
    try {
      const fetchLike = async () => {
        let res = await postApi.getLikePost(data?.id);
        console.log(res);
        let usersLikeId = res.data.map((f) => f.UserId);
        let check = usersLikeId.includes(user?.id);
        setIsLiked(check);
      };
      fetchLike();
    } catch (error) {}
  }, [user?.id, data?.id]);

  const likeHandler = async () => {
    try {
      await postApi.likePost(data?.id);
      //  let res = await postApi.getLikePost(data?.id);
      // let usersLikeId = res.data.map((f) => f.UserId);
      // let check = usersLikeId.includes(user?.id);
      // setIsLiked(check);
    } catch (error) {}

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    setIsComment((b) => !b);
    setCurrentPost(data?.id);
  };
  const handleDeletePost = async () => {
    try {
      let res = await postApi.deletePost(data?.id);
      if (res?.status === "SUCCESS") {
        const newPosts = posts.filter((item) => item.id !== data?.id);
        setPosts(newPosts);
      }
      notify("Bài viết đã xoá thành công");
    } catch (err) {}
  };
  const handleUnfollow = async () => {
    try {
      if (followed) {
        await userApi.unfollow(data?.userId);
        dispatch(userSlice.actions.unfollow(data?.userId));
      } else {
        await userApi.follow(data?.userId);
        dispatch(userSlice.actions.follow(data?.user));
      }
      // setFollowed(!followed);
    } catch (err) {}
  };
  const editPost = async (postId, editText) => {
    try {
      await postApi.editPost(postId, { description: editText });

      setIsShow(false);
    } catch (err) {}
  };
  const handleSubmit = async (newComment) => {
    try {
      const newCommentObj = await postApi.createComment({
        text: newComment,
        postId: data?.id,
      });
      setComments((c) => [newCommentObj, ...c]);
    } catch (error) {}
  };
  const handleReportPost = async () => {
    try {
      const msg = await postApi.reportPost(data?.id);
      notify(msg);
    } catch (error) {}
  };
  const handleClickShowMore = () => {
    setPage(page + 1);
  };
  // const PostDeleted =
  //   <div className="post" ref={ref}>
  //     Bài viết đã xoá
  //   </div>

  // if (deleted) return <PostDeleted  />
  return (
    <div className="post" ref={ref}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`/profile/${data?.user?.username}`}
              className="postTopLeft"
            >
              <Avatar
                className="postProfileImg"
                src={data?.user?.profilePicture}
              ></Avatar>
              <span className="postUsername">{data?.user?.fullName}</span>
            </Link>
            <span className="postDate">{format(data?.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {data?.userId !== user.id ? (
              <div className="optionButton">
                <div className="reportButton" onClick={handleReportPost}>
                  <Tooltip title="Báo cáo bài viết">
                    <Report />
                  </Tooltip>
                </div>
                <button className="rightFollowButton" onClick={handleUnfollow}>
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? (
                    <Remove fontSize="small" />
                  ) : (
                    <Add fontSize="small" />
                  )}
                </button>
              </div>
            ) : (
              <div className="optionButton">
                <div className="removeButton" onClick={handleDeletePost}>
                  <Tooltip title="Xóa bài viết">
                    <Close fontSize="small" />
                  </Tooltip>
                </div>
                <div
                  className="editButton"
                  onClick={() => {
                    setIsShow(true);
                    setPostObj(data);
                  }}
                >
                  <Tooltip title="Sửa bài viết">
                    <Edit fontSize="small" />
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{editText}</span>
          <img className="postImg" src={data?.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="https://res.cloudinary.com/dzens2tsj/image/upload/v1660559011/like_jbx2ph.png"
              onClick={likeHandler}
              alt=""
            />

            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span onClick={handleComment} className="postCommentText">
              {data?.numComment || 0} comments
            </span>
          </div>
        </div>
      </div>
      {isComment && (
        <Comment
          comments={comments}
          user={user}
          length={length}
          setPage={setPage}
          handleSubmit={handleSubmit}
          handleClickShowMore={handleClickShowMore}
          setComments={setComments}
          setLength={setLength}
          // editComment={editComment}
        />
      )}
      {isShow && (
        <PostModal
          postObj={postObj}
          editText={editText}
          setEditText={setEditText}
          setPostObj={setPostObj}
          editPost={editPost}
          setIsShow={setIsShow}
        />
      )}
    </div>
  );
});
export default Post;
