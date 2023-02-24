import { useState, useEffect } from "react";

import AddComment from "./AddComment/AddComment";
import DeleteModal from "./DeleteModal/DeleteModal";
import CommentHeader from "./CommentHeader/CommentHeader";
import CommentFooter from "./CommentFooter";

const Reply = ({ commentData, commentPostedTime, updateScore, addNewReply, editComment, deleteComment, setDeleteModalState}:any) => {
    const [replying, setReplying] = useState(false);
    const [time, setTime] = useState("");
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentData.content);
    const [deleting, setDeleting] = useState(false);

    const createdAt = new Date(commentData.createdAt);
    const today = new Date();
    var differenceInTime = today.getTime() - createdAt.getTime();

    useEffect(()=> {
        setTime(commentPostedTime(differenceInTime)); 
    }, [differenceInTime, commentPostedTime])

    const addReply = (newReply:any) => {
        addNewReply(newReply);
        setReplying(false);
    }

    const commentContent = () => {
        const text = commentData.content.trim().split("");
        const firstWord = text.shift().split(",");

        return !editing ? (
            <div className="comment-content">
                <span className="replyingTo">{firstWord}</span>
                {text.join("")}
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
        editComment(content, commentData.id, "reply");
        setEditing(false);
    };

    const deleteReply = () => {
        deleteComment(commentData.id, "reply");
        setDeleting(false);
    };

    return (
        <div
            className={`comment-container ${commentData.replies[0] !== undefined ? "gap" : " "}`}
        >
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
                {commentContent()}
                {editing && (
                    <button className="update-btn" onClick={updateComment}>
                        update
                    </button>
                )}
            </div>
            <CommentFooter
                commentData={commentData}
                setRyplying={setReplying}
                setDeleting={setDeleting}
                setDeleteModalState={setDeleteModalState}
                setEditing={setEditing}
            />
        </div>

        {replying && (
            <AddComment
                buttonValue={"reply"}
                addComments={addReply}
                replyingTo={commentData.username}
            />
        )}

        {commentData.replies.map((reply:any) =>(
            <Reply  
                key={reply.id}
                commentData={reply}
                commentPostedTime={commentPostedTime}
                addReply={addReply}
            />
        ))}

        {deleting && (
            <DeleteModal
                setDeleting={setDeleting}
                deleteComment={deleteReply}
                setDeleteModalState={setDeleteModalState}
            />
        )}
        </div>
    )
}

export default Reply;