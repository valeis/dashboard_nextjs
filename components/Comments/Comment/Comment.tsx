import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import AuthContext from "@/store/auth-context";
import { Comment } from "@/types/Comment";
import { commentPostedTime } from "@/utils/times";
import { useContext, useEffect, useState } from "react";
import AddComment from "../AddComment/AddComment";
import CommentFooter from "../CommentFooter";
import CommentHeader from "../CommentHeader/CommentHeader";
import DeleteModal from "../DeleteModal/DeleteModal";
import ReplyContainer, { ReplyProps } from "../ReplyContainer";

import "./Comment"

interface ReplyComment extends Omit<ReplyProps, 'commentData'> {
  commentData: Comment
}

const Comment = ({commentInfo, commentData, updateReplies, editComment, commentDelete, setDeleteModalState}: ReplyComment) => {
    const [replying, setReplying] = useState(false);
    const [time, setTime] =  useState("");
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentInfo!.content);
    const [deleting, setDeleting] = useState(false);
    const authCtx = useContext(AuthContext);

    const createdAt = new Date(commentInfo!.createdAt);
    const today = new Date();

    const differenceInTime = today.getTime() - createdAt.getTime();

    useEffect(() => {
        setTime(commentPostedTime(differenceInTime));
    },[differenceInTime]);

    const addReply = (newReply:Comment) => {
        const replies = [...commentInfo!.replies, newReply];
        updateReplies?.(replies, commentInfo!.id);
        setReplying(false);
    };
    
    const updateComment = () => {
        editComment?.(content, commentInfo!.id, "comment", commentInfo!);
        setEditing(false);
    };

    const deleteComment = (id:number, type:string) => {
        const finalType = type !== undefined ? type : "comment";
        const finalId = id !== undefined ? id : commentInfo!.id;
        commentDelete?.(finalId, finalType, commentInfo!.id);
        setDeleting(false);
    };

    return (
      <div className={`comment-container ${commentInfo!.replies !== undefined ? "reply-container-gap" : ""}`}>
        <div className="comment">
          <div className="comment--body">
            <CommentHeader
              commentData={commentInfo!}
              setReplying={setReplying}
              setDeleting={setDeleting}
              setDeleteModalState={setDeleteModalState}
              setEditing={setEditing}
              time={time}
            />
            {!editing ? (
              <div className="comment-content">{commentInfo!.content}</div>
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
            commentData={commentInfo!}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
          />{" "}
        </div>
        {replying && commentInfo!.username !== authCtx.currentUser.name! && (
          <AddComment
            buttonValue={"reply"}
            addComments={addReply}
            replyingTo={commentInfo!.username}
          />
        )}
        <ReplyContainer
          //key={commentData!.replies.id}
          commentData={commentData!.replies}
          commentPostedTime={commentPostedTime}
          addReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />

        {deleting &&
          (commentInfo!.username === authCtx.currentUser.name! ||
            authCtx.currentUser.role === "Admin") && (
            <ConfirmationModal
              type="comment"
              //title={commentData.currentUser}
              setDeleting={setDeleting}
              deleteComment={deleteComment}
              setDeleteModalState={setDeleteModalState}
            />
          )}
      </div>
    );
};

export default Comment;