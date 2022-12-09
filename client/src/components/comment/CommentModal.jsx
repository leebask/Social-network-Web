import { Modal } from "../modal/Modal";
import React, { useState } from "react";
import "./commentModal.css";
import { Button } from "@material-ui/core";

export const CommentModal = ({ comment, setIsShow, editComment }) => {
  const [editText, setEditText] = useState(comment.text);
  return (
    <Modal>
      <form style={{ display: "flex" }}>
        <input
          placeholder="edit here..."
          type="text"
          className="editInput"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />

        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            editComment(comment.id, editText);
          }}
        >
          {" "}
          Edit Comment
        </Button>
        <span className="close" onClick={() => setIsShow(false)}>
          &times;
        </span>
      </form>
    </Modal>
  );
};
