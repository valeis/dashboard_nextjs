import commentRequest from "@/api/comments";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddComment from "./AddComment/AddComment";
import { Comment as CommentType }  from "../../types/Comment";
import Comment from "./Comment/Comment";

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

    const deleteComment = async (id: string) => {
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
    
      useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments));
        deleteModalState
          ? document.body.classList.add("overflow--hidden")
          : document.body.classList.remove("overflow--hidden");
      }, [comments, deleteModalState]);

      let addComments = async (newComment:any) => {
        //let updatedComments:any = [...comments, newComment];
        let updatedComments:any = [...comments];
        updatedComments.push(newComment);
        let data = await commentRequest.post(newComment);
        updateComments(updatedComments);
      };
    
      let updateReplies = (replies:any, id:any) => {
        let updatedComments = [...comments];
        updatedComments.forEach((data:any) => {
          if (data.id === id) {
            data.replies = [...replies];
          }
        });
        updateComments(updatedComments);
      };

      let editComment = (content:any, id:any, type:any, comment:any) => {
        let updatedComments = [...comments];
    
        if (type === "comment") {
          comment.content = content;
          update.mutate(comment);
          updatedComments.forEach((data:any) => {
            if (data.id === id) {
              data.content = content;
            }
          });
        } else if (type === "reply") {
          updatedComments.forEach((comment:any) => {
            comment.replies.forEach((data:any) => {
              if (data.id === id) {
                data.content = content;
              }
            });
          });
        }
    
        updateComments(updatedComments);
      };
    

      let commentDelete = (id:any, type:any, parentComment:any) => {
        let updatedComments = [...comments];
        let updatedReplies = [];
    
        if (type === "comment") {
          deleteCommentHandler.mutate(id);
          //updatedComments = updatedComments.filter((data:any) => data.id !== id);
        } else if (type === "reply") {
          comments.forEach((comment:any) => {
            if (comment.id === parentComment) {
              updatedReplies = comment.replies.filter((data:any) => data.id !== id);
              comment.replies = updatedReplies;
            }
          });
        }
    
        updateComments(updatedComments);
      };
    
      return (
        <main className="App">
          {comments.map((comment:any) => (
            <Comment
              key={comment.id}
              commentData={comment}
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