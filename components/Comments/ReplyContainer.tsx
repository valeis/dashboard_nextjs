import { Comment } from "@/types/Comment";
import Reply from "./Reply";

export type ReplyProps = {
    commentData?: Comment[];
    commentInfo?: Comment;
    commentPostedTime?: (timeInMileSec:number) => string;
    updateReplies?:(replies:(string | Comment)[], id:number) => void;
    addReply?: (reply: Comment) => void;
    editComment?: (content:string, id:number, type:string, commentData:Comment) => void;
    deleteComment?: (id: number, type:string) => void;
    commentDelete?: (id: number, type:string, parentComment:number) => void;
    setDeleteModalState?: (value:boolean) => void;
}

const ReplyContainer = ({
    commentData,
    commentPostedTime,
    addReply,
    editComment,
    deleteComment,
    setDeleteModalState
}:ReplyProps) => {
    return(
        <div className="reply-container">
            {commentData?.map((data) => (  
                <Reply
                    key={data.id}
                    commentData={data}
                    commentPostedTime={commentPostedTime}
                    addReply={addReply}
                    editComment={editComment}
                    deleteComment={deleteComment}
                    setDeleteModalState={setDeleteModalState}
                />                
            ))}
        </div>
    );
};

export default ReplyContainer;