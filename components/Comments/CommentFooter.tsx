import CommentBtn from "./CommentBtn"
import { CommmentHeaderProps } from "./CommentHeader/CommentHeader";

const CommentFooter = ({commentData, setReplying, setDeleting, setDeleteModalState, setEditing}:CommmentHeaderProps) => {
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