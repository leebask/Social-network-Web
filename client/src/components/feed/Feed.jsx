import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import useQuery from "../../hooks/useQuery";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import api from "../../api/API";
import React, { useState, useRef, useCallback, useEffect } from "react";
import usePostSearch from "../../hooks/usePostSearch";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosClient from "../../api/axiosClient";
import { Skeleton } from "@mui/material";
import { Avatar } from "@material-ui/core";

export default function Feed({ username }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const user = useSelector(userSelector);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // const {
  //   data,
  //   hasMore,
  //   loading,
  //   error
  // } = usePostSearch(query, page)

  const url = !username
    ? api.GET_POST_TIMELINE
    : api.GET_POST_PROFILE + username;
  // let { data, loading, hasMore, error } = useQuery(url, page, query);

  // const lastBookElementRef = useCallback(node => {
  //   if (loading) return
  //   if (observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       setPage(prevPageNumber => prevPageNumber + 1)
  //     }
  //   })
  //   if (node) observer.current.observe(node)
  // }, [loading, hasMore])

  useEffect(() => {
    getData(0);
  }, [username]);

  const getData = async (currentPage) => {
    try {
      const res = await axiosClient.get(url, { params: { page: currentPage } });
      if (currentPage === 0) {
        setPosts(res.data);
      } else {
        setPosts([...posts, ...res.data]);
      }
      setPage(currentPage + 1);

      if (res.data.length <= 0) {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
    }
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && (
          <Share getData={getData} />
        )}
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={() => {
            getData(page);
          }}
          hasMore={hasMore}
          loader={
            <div className="post" style={{ width: "98%" }}>
              <div className="postWrapper">
                <div className="postTop">
                  <div className="postTopLeft">
                    <div className="postTopLeft">
                      <Skeleton variant="circular" width={40} height={40} />
                      <span className="postUsername">
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={20}
                        />
                      </span>
                    </div>
                    <span className="postDate">
                      <Skeleton variant="rectangular" width={80} height={20} />
                    </span>
                  </div>
                </div>
                <div className="postCenter">
                  <span className="postText">
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                  </span>
                </div>
                <div className="postBottom">
                  <div className="postBottomLeft">
                    <Skeleton variant="rounded" width={565} height={300} />
                    <span className="postLikeCounter"></span>
                  </div>
                  <div className="postBottomRight">
                    <span className="postCommentText"></span>
                  </div>
                </div>
              </div>
            </div>
          }
          endMessage={<>END</>}
        >
          {posts.map((p, index) => (
            <Post key={index} post={p} posts={posts} setPosts={setPosts} />
          ))}
        </InfiniteScroll>
        {/* {data.map((p, index) => {
          if (data.length === index + 1) {
            return <Post ref={lastBookElementRef} key={index} post={p} />
          } else {
            return <Post key={index} post={p} />
          }
        })} */}
      </div>
    </div>
  );
}
