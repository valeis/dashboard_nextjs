import commentRequest from "@/api/comments";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import AddComment from "./AddComment/AddComment";
import Comment from "./Comment/Comment";

const CommentsModule = () => {
    const [comments, updateComments] = useState([]);
    const [deleteModalState, setDeleteModalState] = useState(false);

    // const {data}= useQuery(["comments"], () => commentRequest.get, {
    //   onSuccess: (data) => {
    //     updateComments(data.comment);
    //   },
    // });
    const getData = async () => {
      const res = await fetch("./data/data.json");
      const data = await res.json();
      updateComments(data.comments);
    };
        

    useEffect(() => {
        localStorage.getItem("comments") !== null
          ? updateComments(JSON.parse(localStorage.getItem("comments")!))
          : getData();
      }, []);
    
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

      let editComment = (content:any, id:any, type:any) => {
        let updatedComments = [...comments];
    
        if (type === "comment") {
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
          updatedComments = updatedComments.filter((data:any) => data.id !== id);
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