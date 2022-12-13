import { Modal } from "../modal/Modal";
import React, { useState } from "react";
import { useEffect } from "react";
// import './PostModal.css';

export const PostModal = ({
  postObj,
  setPostObj,
  setIsShow,
  editPost,
  editText,
  setEditText,
}) => {
  const [description, setDescription] = useState(postObj?.description);
  useEffect(() => {
    setDescription(postObj?.setDescription);
  }, [postObj]);
  return (
    <Modal>
      <form class="form">
        <input
          placeholder="edit here..."
          type="text"
          className="editInput"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="editModal"
          onClick={(e) => {
            e.preventDefault();
            editPost(postObj.id, description);
          }}
        >
          Edit Post
        </button>
        <span className="close" onClick={() => setIsShow(false)}>
          &times;
        </span>
      </form>
    </Modal>
  );
};
