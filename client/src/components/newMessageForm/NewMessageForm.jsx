import React from "react";
import "emoji-mart/css/emoji-mart.css";
import data from "@emoji-mart/data";
// import Picker from '@emoji-mart/react';
import { Picker } from "emoji-mart";
import sendIcon from "../../icons/sendIcon.png";
import attachIcon from "../../icons/attachIcon.png";
import emojiIcon from "../../icons/emojiIcon.png";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./newMessageForm.css";
import { Cancel } from "@material-ui/icons";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useState } from "react";

function NewMessageForm({
  // newMessage,
  // setNewMessage,
  handleStartTyping,
  // selectFile,
  // setFile,
  handleStopTyping,
  handleSubmit,
  // file,
}) {
  const { showEmoji, setShowEmoji, ref } = useOutsideClick(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleEmojiShow = () => {
    setShowEmoji((v) => !v);
  };
  const handleEmojiSelect = (e) => {
    setMessage((newMessage) => (newMessage += e.native));
  };
  const handleNewMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <form
        className="form"
        onSubmit={(e) => handleSubmit(e, { text: message, file: file })}
      >
        <textarea
          className="textarea"
          type="text"
          value={message}
          onChange={handleNewMessageChange}
          // onKeyPress={handleStartTyping}
          // onKeyUp={handleStopTyping}
          placeholder="Say something..."
          style={{ resize: "none" }}
        />
        <label htmlFor="file-input">
          <div
            className="uploadButton"
            style={{
              height: "44px",
              width: "40px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img className="uploadImage" src={attachIcon} alt="uploadImage" />
          </div>
        </label>
        <input
          id="file-input"
          className="input"
          onChange={handleOnChangeFile}
          type="file"
        />
        <button className="sendButton" type="button" onClick={handleEmojiShow}>
          <img className="uploadImage" src={emojiIcon} alt="uploadImage" />
        </button>
        <button
          className="sendButton"
          onClick={(e) => {
            handleSubmit(e, { text: message, file: file });
            setMessage("");
            setFile(null);
          }}
        >
          <img className="uploadImage" src={sendIcon} alt="uploadImage" />
        </button>
      </form>
      <div>
        {file !== null && (
          <div className="shareImgContainer">
            <img
              className="shareImgMessage"
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Cancel
              className="shareCancelImg"
              onClick={() => {
                setFile(null);
                // URL.revokeObjectURL(URL.createObjectURL(file));
              }}
            />
          </div>
        )}
        {showEmoji && (
          <div ref={ref}>
            <Picker onSelect={handleEmojiSelect} emojiSize={20} />
          </div>
        )}
      </div>
    </>
  );
}

export default NewMessageForm;
