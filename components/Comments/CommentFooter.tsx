import CommentBtn from "./CommentBtn"

const CommentFooter = ({commentData, setReplying, setDeleting, setDeleteModalState, setEditing}:any) => {
    return (
        <div className="comment--footer">
            <CommentBtn
                commentData={commentData}
                setReplying={setReplying}
                setDeleting={setDeleting}
                setDeleteModalState={setDeleteModalState}
                setEditing={setEditing}
            />
        </div>
    )
}

export default CommentFooter;