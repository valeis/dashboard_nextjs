import { commentPostedTime } from "@/utils/times";
import { useEffect, useState } from "react";
import AddComment from "../AddComment/AddComment";
import CommentFooter from "../CommentFooter";
import CommentHeader from "../CommentHeader/CommentHeader";
import DeleteModal from "../DeleteModal/DeleteModal";
import ReplyContainer from "../ReplyContainer";

import "./Comment"


const Comment = ({commentData, updateReplies, editComment, commentDelete, setDeleteModalState}:any) => {
    const [replying, setReplying] = useState(false);
    const [time, setTime] =  useState("");
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentData.content);
    const [deleting, setDeleting] = useState(false);

    const createdAt = new Date(commentData.createdAt);
    const today = new Date();

    const differenceInTime = today.getTime() - createdAt.getTime();

    useEffect(() => {
        setTime(commentPostedTime(differenceInTime));
    },[differenceInTime]);

    const addReply = (newReply:any) => {
        const replies = [...commentData.replies, newReply];
        updateReplies(replies, commentData.id);
        setReplying(false);
    };
    
    const updateComment = () => {
        editComment(content, commentData.id, "comment");
        setEditing(false);
    };

    const deleteComment = (id:any, type:any) => {
        const finalType = type !== undefined ? type : "comment";
        const finalId = id !== undefined ? id : commentData.id;
        commentDelete(finalId, finalType, commentData.id);
        setDeleting(false);
    };

    return (
        <div
        className={`comment-container ${
            commentData.replies[0] !== undefined ? "reply-container-gap" : ""
        }`}
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
                    {!editing ? (
                        <div className="comment-content">{commentData.content}</div>
                    ):(
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
                /> {" "}
            </div>
            {replying && (
                <AddComment
                    buttonValue={"reply"}
                    addComments={addReply}
                    replyingTo={commentData.username}
                />
            )}
            
                <ReplyContainer
                    key={commentData.replies.id}
                    commentData={commentData.replies}
                    commentPostedTime={commentPostedTime}
                    addReply={addReply}
                    editComment={editComment}
                    deleteComment={deleteComment}
                    setDeleteModalState={setDeleteModalState}
                />
            
            {deleting && (
                <DeleteModal
                    setDeleting={setDeleting}
                    deleteComment={deleteComment}
                    setDeleteModalState={setDeleteModalState}
                />
            )}
        </div>
    );
};

export default Comment;