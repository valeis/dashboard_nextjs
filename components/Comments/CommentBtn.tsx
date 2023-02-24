import AuthContext from "@/store/auth-context";
import { useContext } from "react";
import * as GoIcons from "react-icons/go";
import * as MdIcons from "react-icons/md";

const CommentBtn = ({
  commentData,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
}: any) => {
  const authCtx = useContext(AuthContext);
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
      {commentData.username !== authCtx.currentUser.name && (
        <button
          className={`reply-btn ${
            !commentData.currentUser ? "" : "display--none"
          }`}
          onClick={showAddComment}
        >
          <GoIcons.GoReply />
          Reply
        </button>
      )}
      {(commentData.username === authCtx.currentUser.name! ||
        authCtx.currentUser.role === "Admin") && (
        <button
          className={`delete-btn ${
            !commentData.currentUser ? "" : "display--none"
          }`}
          onClick={showDeleteModal}
        >
          <MdIcons.MdDelete />
          Delete
        </button>
      )}

      { commentData.username === authCtx.currentUser.name! &&
        <button
          className={`edit-btn ${
            commentData.currentUser ? " " : "display--none"
          }`}
          onClick={showEditComment}
        >
          <MdIcons.MdEdit />
          Edit
        </button>
      }
    </div>
  );
};

export default CommentBtn;
