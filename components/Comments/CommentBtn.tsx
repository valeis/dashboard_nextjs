const CommentBtn = ({commentData, setReplying, setDeleting, setDeleteModalState, setEditing}:any) => {

    let counter = false;
    const showAddComment = () => {
        counter ? setReplying(false) : setReplying(true);
        counter = true;
    };

    const showDeleteModal = () => {
        setDeleting(true);
        setDeleteModalState(true);
    };

    const showEditComment = () => {
        setEditing(true);
    };

    return (
        <div className="comment--btn">
            <button
                className={`reply-btn ${
                    !commentData.currentUser ? "" : "display--none"
                }`}
                onClick={showAddComment}
            >
                Reply              
            </button>
            <button
                className={`delete-btn ${
                    !commentData.currentUser ? "" : "display--none"
                }`}
                onClick={showDeleteModal}
            >
                Delete
            </button>
            <button
                className={`edit-btn ${commentData.currentUser ? " " : "display--none"}`}
                onClick={showEditComment}
            >
                Edit
            </button>
        </div>
    );
};

export default CommentBtn;
