import AuthContext from "@/store/auth-context";
import { AvatarInline, Textarea } from "ebs-design";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import "./AddComment";

const AddComment = ({ buttonValue, addComments, replyingTo }: any) => {
  const replyingToUser = replyingTo ? `@${replyingTo},` : "";
  const [comment, setComment] = useState("");
  const authCtx = useContext(AuthContext);
  const postId = window.location.pathname.split("/").pop();

  const clickHandler = () => {
    if (comment === "" || comment === " ") return;
    const newComment = {
      id: Math.floor(Math.random() * 100) + 5,
      postId: postId,
      content: replyingToUser + comment,
      createdAt: new Date(),
      username: authCtx.currentUser.name,
      currentUser: true,
      replies: [],
    };

    addComments(newComment);
    setComment("");
  };

  return (
    <div className="add-comment">
      <div className="profile-pic">
        <AvatarInline
          alt={authCtx.currentUser.name}
          size="small"
          status="active"
          type="regular"
          circle
          
        />
      </div>
      <textarea
        className="comment-input"
        placeholder="Add a comment"
        value={ replyingToUser + comment}
        onChange={(e) => {
          setComment(e.target.value.replace(replyingTo ? `@${replyingTo},` : "", ""));
        }}
      />
      <div className="send-btn-container">
        <div className="profile-pic"></div>
        <button className="add-btn" onClick={clickHandler}>
          {buttonValue}
        </button>
      </div>
    </div>
  );
};
export default AddComment;
