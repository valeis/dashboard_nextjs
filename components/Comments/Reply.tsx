import { useState, useEffect } from "react";

import AddComment from "./AddComment/AddComment";
import DeleteModal from "./DeleteModal/DeleteModal";
import CommentHeader from "./CommentHeader/CommentHeader";
import CommentFooter from "./CommentFooter";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { ReplyProps } from "./ReplyContainer";
import { Comment } from "@/types/Comment";

interface ReplyComment extends Omit<ReplyProps, 'commentData'> {
    commentData: Comment
}

const Reply = ({commentData, commentPostedTime, addReply, editComment, deleteComment, setDeleteModalState}:ReplyComment, key?:number) => {
    const [replying, setReplying] = useState(false);
    const [time, setTime] = useState("");
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentData!.content);
    const [deleting, setDeleting] = useState(false);

    const createdAt = new Date(commentData!.createdAt);
    const today = new Date();
    var differenceInTime = today.getTime() - createdAt.getTime();

    useEffect(()=> {
        setTime(commentPostedTime!(differenceInTime)); 
    }, [differenceInTime, commentPostedTime])

    const addNewReply = (newReply:Comment) => {
        addReply?.(newReply);
        setReplying(false);
    }

    const commentContent = () => {
        const text = commentData!.content.trim().split(" ");
        const firstWord = text.shift()!.split(",");

        return !editing ? (
            <div className="comment-content">
                <span className="replyingTo">{firstWord}</span>
                {text.join(" ")}
            </div>
        ) : (
            <textarea
                className="content-edit-box"
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
        );
    };

    const updateComment = () => {
        editComment?.(content, commentData!.id, "reply", commentData!);
        setEditing(false);
    };

    const deleteReply = () => {
        deleteComment?.(commentData!.id, "reply");
        setDeleting(false);
    };

    return (
        <div
            className={`comment-container ${commentData!.replies !== undefined ? "gap" : ""}`}
        >
            <div className="comment">
            <div className="comment--body">
                <CommentHeader
                    commentData={commentData!}
                    setReplying={setReplying}
                    setDeleting={setDeleting}
                    setDeleteModalState={setDeleteModalState}
                    setEditing={setEditing}
                    time={time}
                />
                {commentContent()}
                {editing && (
                    <button className="update-btn" onClick={updateComment}>
                        update
                    </button>
                )}
            </div>
            <CommentFooter
                commentData={commentData!}
                setReplying={setReplying}
                setDeleting={setDeleting}
                setDeleteModalState={setDeleteModalState}
                setEditing={setEditing}
            />
        </div>

        {replying && (
            <AddComment
                buttonValue={"reply"}
                addComments={addNewReply}
                replyingTo={commentData!.username}
            />
        )}

        {commentData!.replies.map((reply:any) =>(
            <Reply  
                key={reply.id}
                commentData={reply}
                commentPostedTime={commentPostedTime}
                addReply={addReply}
            />
        ))}

        {deleting && (
            <ConfirmationModal
                type="reply"
                setDeleting={setDeleting}
                deleteComment={deleteReply}
                setDeleteModalState={setDeleteModalState}
            />
        )}
        </div>
    )
}

export default Reply;