import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as AIcons from "react-icons/ai";
import { AvatarInline, Button, Card, Icon, Space } from "ebs-design";
import Image from "next/image";
import { useRouter } from "next/router";

import postsRequest from "@/api/posts";
import { Card as CardType } from "@/types/Card";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import AuthContext from "@/store/auth-context";

import "./PostCard";

const PostCard = ({
  id,
  title,
  description,
  image,
  date,
  author,
}: CardType) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const parse = require("html-react-parser");
  const authCtx = useContext(AuthContext);
  const [postToDelete, setPostToDelete] = useState("");

  const deletePost = async (id: string) => {
    return await postsRequest.delete(id);
  };

  const deletePostHandler = useMutation(deletePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const editPostHandler = (id?: string) => {
    router.push(`/posts/${id}/edit`);
  };

  return (
    <Card size="small">
      <Card.Header bordered>
        <Space align="center" justify="space-between">
          <Space
            align="start"
            direction="vertical"
            size="small"
            justify="center"
          >
            <div className="header">
              <AvatarInline alt={author} />
            </div>
            <div className="header">{date}</div>
          </Space>
          {(authCtx.currentUser?.role === "Admin" || authCtx.currentUser?.name === author) &&
          <Space
            align="end"
            direction="horizontal"
            size="small"
            justify="center"
          >
            <Button
              type="text"
              prefix={<BiIcons.BiEdit />}
              onClick={() => {
                editPostHandler(id);
              }}
            ></Button>
            <Button
              type="text"
              prefix={<MdIcons.MdDeleteOutline />}
              onClick={() => {
                setPostToDelete(id!);
              }}
            ></Button>
          </Space>
          }
        </Space>
      </Card.Header>
      <Card.Body>
        <Space justify="center">
          <b>
            <div className="card-text">
              {title?.substring(0, 30)}
              {title!.length > 30 ? "..." : ""}
            </div>
          </b>
        </Space>
        <Image
          className="card-image"
          src={image!}
          alt={title!}
          width={250}
          height={200}
          quality={100}
        />
        
        <Space justify="center">
          <div className="card-description">
            <Space size="small" justify="space-between">
              {parse(description?.substring(0, 50))}
              <b className="etc">{description!.length > 50 ? "..." : ""}</b>
            </Space>
          </div>
        </Space>
      </Card.Body>

      <Card.Footer>
        <Space align="start" justify="space-between" >
            <Button
              onClick={() => {
                router.push(`/posts/${id}`);
              }}
              prefix={<GrIcons.GrFormNextLink className="icon-gr"/>}
              type="light"
              size="medium"
              className="card"
            >
              Read full article
            </Button>

            <Button
              onClick={() => {
                router.push(`/posts/${id}`);
              }}
              prefix={<AIcons.AiOutlineComment color="#3366FF"/>}
              type="light"
              size="medium"
              className="card-comment"
            >
            </Button>
        </Space>

        
        
        {postToDelete && (
          <ConfirmationModal
            setElementToDelete={setPostToDelete}
            deleteElementHandler={deletePostHandler}
            id={id!}
            title={title!}
          />
        )}
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
