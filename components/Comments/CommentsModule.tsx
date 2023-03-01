import commentRequest from "@/api/comments";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddComment from "./AddComment/AddComment";
import { Comment as CommentType }  from "../../types/Comment";
import Comment from "./Comment/Comment";
type updateReply ={
  replies: Comment;
  commentId: number;
}

const CommentsModule = () => {
    const queryClient = useQueryClient();
    const [comments, updateComments] = useState<CommentType[]>([]);
    const [deleteModalState, setDeleteModalState] = useState(false);
    const postId = (window.location.pathname).split('/').pop();

    useQuery(["comments"], ()=>commentRequest.get(postId!), {
      onSuccess: (data) => {
        updateComments(data);
      },
    });

    const deleteComment = async (id: number) => {
      return commentRequest.delete(id);
    }

    const deleteCommentHandler = useMutation(deleteComment, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["comments"], exact: true})
      },
      onError:() => {
        console.log("Some error occured");
      }
    })

    const updateComment = async (comment: CommentType) => {
      let data = await commentRequest.put(comment);
      return data; 
    }
   
    
    const update = useMutation(updateComment, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["comments"])
      },
      onError: () => {
        console.log("Some error occured while updating a post.")
      }
    })
    const updateReply = async (variables: updateReply) => {
      let data = await commentRequest.postReply(variables);
      return data;
    }

    const changeReply = useMutation(updateReply, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["comments"])
      },
      onError: () => {
        console.log("Some error occured while updating a post (reply).")
      }
    })


      let addComments = async (newComment:any) => {
        let updatedComments:any = [...comments, newComment];
        let data = await commentRequest.post(newComment);
        updateComments(updatedComments);
      };
    
      let updateReplies = (replies:any, commentId:any) => {
        let updatedComments: any = [...comments];
        updatedComments.forEach((data:any) => {
          if (data.id === commentId) {
            data.replies = [...replies];
            replies = data.replies;
            console.log(replies)
            changeReply.mutate({replies, commentId});
          }
        });
        updateComments(updatedComments);
      };

      let editComment = (content:any, id:any, type:any, comment:any) => {
        let updatedComments = [...comments];
    
        if (type === "comment") {
          updatedComments.forEach((data) => {
            if (data.id === id) {
              data.content = content;
              comment.content = content;
              update.mutate(comment);
            }
          });
        } else if (type === "reply") {
          updatedComments.forEach((comment:any) => {
            comment.replies.forEach((data:any) => {
              if (data.id === id) {
                data.content = content;
                id = comment.id;
                comment = comment.replies;
                let commentId = id;
                let replies = comment.replies;
                changeReply.mutate({replies, commentId});
              }
            });
          });
        }
    
        updateComments(updatedComments);
      };
    

      let commentDelete = (id:number, type:string, parentComment:number) => {
        let updatedComments = [...comments];
        let updatedReplies = [];
    
        if (type === "comment") {
          deleteCommentHandler.mutate(id);
          //updatedComments = updatedComments.filter((data:any) => data.id !== id);
        } else if (type === "reply") {
          comments.forEach((comment:CommentType) => {
            if (comment.id === parentComment) {
              updatedReplies = comment.replies.filter((data) => data.id !== id);
              comment.replies = updatedReplies;
              let commentId = comment.id;
              let replies = comment;
               changeReply.mutate({replies, commentId});
            }
          });
        }
    
        updateComments(updatedComments);
      };
    
      return (
        <main className="App">
          {comments.map((comment:CommentType) => (
            <Comment
              key={comment.id}
              commentData={comment}
              commentInfo={comment}
              updateReplies={updateReplies}
              editComment={editComment}
              commentDelete={commentDelete}
              setDeleteModalState={setDeleteModalState}
            />
          ))}
          <AddComment buttonValue={"send"} addComments={addComments} />
        </main>
      );
};
    
export default CommentsModule ;