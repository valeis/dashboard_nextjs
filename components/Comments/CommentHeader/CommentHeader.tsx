import AuthContext from "@/store/auth-context";
import { AvatarInline } from "ebs-design";
import { useContext } from "react";
import CommentBtn from "../CommentBtn";

const CommentHeader = ({
  commentData,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
  time,
}: any) => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="comment--header">
      <div className={`profile-pic ${commentData.username}`}>
        <AvatarInline
          alt={commentData.username}
          size="small"
          type="regular"
          reversed
          circle
        />
      </div>
      <div className="username">{commentData.username}</div>
      {commentData.username === authCtx.currentUser.name ? (
        <div className="you-tag">you</div>
      ) : (
        ""
      )}
      <div className="comment-posted-time">{`${time} ago`}</div>
      <CommentBtn
        commentData={commentData}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentHeader;
