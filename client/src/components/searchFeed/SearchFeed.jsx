import Post from "../post/Post";
import Share from "../share/Share";
import "./searchFeed.css";
import useQuery from "../../hooks/useQuery";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import api from "../../api/API";
import React, { useState, useRef, useCallback, useEffect } from "react";
import usePostSearch from "../../hooks/usePostSearch";
import { Stack } from "@mui/system";
import { Add, Remove } from "@material-ui/icons";
import { SearchUser } from "../searchUser/SearchUser";
import userApi from "../../api/userApi";
import axiosClient from "../../api/axiosClient";
import { CircularProgress } from "@material-ui/core";

export default function SearchFeed({ searchText }) {
  // const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [pageUser, setPageUser] = useState(0);
  const [pagePost, setPagePost] = useState(0);
  const user = useSelector(userSelector);
  const [lengthUser, setLengthUser] = useState(0);
  const [lengthPost, setLengthPost] = useState(0);
  const [userSearch, setUserSearch] = useState([]);
  const [postSearch, setPostSearch] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getUserSearch = async () => {
      const res = await axiosClient.get(api.QUERY_USERS, {
        params: {
          page: pageUser,
          textSearch: searchText,
        },
      });
      setUserSearch(res.data);
      setLoading(false);
    };
    getUserSearch();
  }, [pageUser, searchText]);
  // const {
  //   data,
  //   hasMore,
  //   loading,
  //   error
  // } = usePostSearch(query, page)
  // useEffect(()=>{
  //   const fetchUser= async()=>{
  //     try {
  //       const res = await userApi.queryUsers({params:{
  //         page: pageUser,
  //         textSearch: searchText
  //       }})
  //       if(pageUser>0)
  //       setUserSearch([...userSearch,...res.data])
  //       else setUserSearch([...res.data])
  //       setLengthUser(res.length)
  //     } catch (error) {

  //     }
  //   }
  //   fetchUser()
  // },[searchText, pageUser])

  // let usersQuery = useQuery(api.QUERY_USERS, pageUser, searchText);
  // let postsQuery = useQuery(api.QUERY_POSTS, pagePost, searchText);

  const handleClickShowMore1 = () => {
    setPageUser((pre) => pre + 1);
  };
  const handleClickShowMore2 = () => {
    if (pagePost + 1 > lengthPost) return;
    if (pagePost + 1 < lengthPost) {
      setPagePost((p) => p + 1);
    }
  };
  // useEffect(() => {
  //   setUserSearch(usersQuery.data);

  //   setLengthUser(usersQuery.length);
  // }, [usersQuery]);
  // useEffect(() => {
  //   setPostSearch(postsQuery.data);

  //   setLengthPost(postsQuery.length);
  // }, [postsQuery]);

  useEffect(() => {
    if (lengthUser === 0) setUserSearch([]);
  }, [lengthUser]);
  useEffect(() => {
    if (lengthPost === 0) setPostSearch([]);
  }, [lengthPost]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <div className="userWrapepr">
          {loading ? (
            <>
              <CircularProgress />
            </>
          ) : (
            userSearch.map((u, index) => {
              return <SearchUser user={u} key={index} />;
            })
          )}
          {userSearch.length === 5 && (
            <div className="showMoreBtn" onClick={handleClickShowMore1}>
              <p>Xem thêm người dùng.</p>
            </div>
          )}
          {userSearch.length === 0 && !loading && (
            <p>{`Không có người dùng nào có từ khóa '${searchText}'`}</p>
          )}
        </div>
        <div className="postWrapepr">
          {postSearch.map((p, index) => {
            return (
              <Post
                key={index}
                post={p}
                posts={postSearch}
                setPosts={setPostSearch}
              />
            );
          })}
          {lengthPost === 0 ? (
            <p>{`Không có bài viết nào có từ khóa '${searchText}'`}</p>
          ) : (
            <div className="showMoreBtn" onClick={handleClickShowMore2}>
              <p>Xem thêm bài viết.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
