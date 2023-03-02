import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import AuthContext from "@/store/auth-context";
import { Comment } from "@/types/Comment";
import { commentPostedTime } from "@/utils/times";
import { useContext, useEffect, useState } from "react";
import AddComment from "../AddComment/AddComment";
import CommentFooter from "../CommentFooter";
import CommentHeader from "../CommentHeader/CommentHeader";
import ReplyContainer, { ReplyProps } from "../ReplyContainer";

import "./Comment"

interface ReplyComment extends Omit<ReplyProps, 'commentData'> {
  commentData: Comment
}

const Comment = ({commentData, updateReplies, editComment, commentDelete, setDeleteModalState}: ReplyComment) => {
    const [replying, setReplying] = useState(false);
    const [time, setTime] =  useState("");
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentData.content);
    const [deleting, setDeleting] = useState(false);
    const authCtx = useContext(AuthContext);

    const createdAt = new Date(commentData.createdAt);
    const today = new Date();

    const differenceInTime = today.getTime() - createdAt.getTime();

    useEffect(() => {
        setTime(commentPostedTime(differenceInTime));
    },[differenceInTime]);

    const addReply = (newReply:Comment) => {
        const replies = [...commentData.replies, newReply];
        let commentId = commentData.id;
        updateReplies?.({replies, commentId});
        setReplying(false);
    };
    
    const updateComment = () => {
        let id = commentData.id;
        let comment = commentData;
        let type = "comment";
        editComment?.({content, id, type, comment});
        setEditing(false);
    };

    const deleteComment = (id:number, type:string) => {
        const finalType = type !== undefined ? type : "comment";
        const finalId = id !== undefined ? id : commentData.id;
        commentDelete?.(finalId, finalType, commentData.id);
        setDeleting(false);
    };

    return (
      <div className={`comment-container ${commentData.replies !== undefined ? "reply-container-gap" : ""}`}>
        <div className="comment">
          <div className="comment--body">
            <CommentHeader
              commentData={commentData}
              setReplying={setReplying}
              setDeleting={setDeleting}
              setDeleteModalState={setDeleteModalState}
              setEditing={setEditing}
              time={time}
            />
            {!editing ? (
              <div className="comment-content">{commentData.content}</div>
            ) : (
              <textarea
                className="content-edit-box"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            )}
            {editing && (
              <button className="update-btn" onClick={updateComment}>
                update
              </button>
            )}
          </div>
          <CommentFooter
            commentData={commentData}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
          />{" "}
        </div>
        {replying && commentData.username !== authCtx.currentUser.name! && (
          <AddComment
            buttonValue={"reply"}
            addComments={addReply}
            replyingTo={commentData.username}
          />
        )}
        <ReplyContainer
          commentData={commentData!.replies}
          commentPostedTime={commentPostedTime}
          addReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />

        {deleting &&
          (commentData.username === authCtx.currentUser.name! ||
            authCtx.currentUser.role === "Admin") && (
            <ConfirmationModal
              type="comment"
              setDeleting={setDeleting}
              deleteComment={deleteComment}
              setDeleteModalState={setDeleteModalState}
            />
          )}
      </div>
    );
};

export default Comment;