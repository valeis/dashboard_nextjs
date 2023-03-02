import commentRequest from "@/api/comments";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddComment from "./AddComment/AddComment";
import { Comment as CommentType } from "../../types/Comment";
import Comment from "./Comment/Comment";

export type updateReply = {
  replies: CommentType[];
  commentId: number;
};

export type editComment = {
  content: string;
  id: number;
  type: string;
  comment: CommentType
}

const CommentsModule = () => {
  const queryClient = useQueryClient();
  const [comments, updateComments] = useState<CommentType[]>([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const postId = window.location.pathname.split("/").pop();

  useQuery(["comments"], () => commentRequest.get(postId!), {
    onSuccess: (data) => {
      updateComments(data);
    },
  });

  const deleteComment = async (id: number) => {
    return commentRequest.delete(id);
  };

  const deleteCommentHandler = useMutation(deleteComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments"], exact: true });
    },
    onError: () => {
      console.log("Some error occured");
    },
  });

  const updateComment = async (comment: CommentType) => {
    let data = await commentRequest.put(comment);
    return data;
  };

  const update = useMutation(updateComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
    },
    onError: () => {
      console.log("Some error occured while updating a post.");
    },
  });

  const updateReply = async (variables: updateReply) => {
    let data = await commentRequest.postReply(variables);
    return data;
  };

  const changeReply = useMutation(updateReply, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
    },
    onError: () => {
      console.log("Some error occured while updating a post (reply).");
    },
  });

  let addComments = async (newComment: CommentType) => {
    let updatedComments = [...comments, newComment];
    let data = await commentRequest.post(newComment);
    updateComments(updatedComments);
  };

  let updateReplies = (props:updateReply) => {
    let updatedComments = [...comments];
    updatedComments.forEach((data) => {
      if (data.id === props.commentId) {
        data.replies = [...props.replies];
        props.replies = data.replies;
        let replies=props.replies;
        let commentId=props.commentId;
        changeReply.mutate({replies, commentId});
      }
    });
    updateComments(updatedComments);
  };

  let editComment = (props: editComment) => {
    let updatedComments = [...comments];

    if (props.type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === props.id) {
          data.content = props.content;
          props.comment.content = props.content;
          update.mutate(props.comment);
        }
      });
    } else if (props.type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === props.id) {
            data.content = props.content;
            let commentId = comment.id;
            let replies = comment.replies;
            changeReply.mutate({ replies, commentId });
          }
        });
      });
    }

    updateComments(updatedComments);
  };

  let commentDelete = (id: number, type: string, parentComment: number) => {
    let updatedComments = [...comments];
    let updatedReplies = [];

    if (type === "comment") {
      deleteCommentHandler.mutate(id);
    } else if (type === "reply") {
      comments.forEach((comment) => {
        if (comment.id === parentComment) {
          updatedReplies = comment.replies.filter((data) => data.id !== id);
          comment.replies = updatedReplies;
          let commentId = comment.id;
          let replies = comment.replies;
          changeReply.mutate({ replies, commentId });
        }
      });
    }

    updateComments(updatedComments);
  };

  return (
    <main className="App">
      {comments.map((comment: CommentType) => (
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

export default CommentsModule;
