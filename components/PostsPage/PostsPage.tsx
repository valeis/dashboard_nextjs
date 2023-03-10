import { Button, Col, Row } from "ebs-design";
import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import postsRequest from "@/api/posts";
import PostCard from "../PostCard/PostCard";

import "./PostsPage";

const Posts = () => {
  const router = useRouter();
  const addPostHandler = () => {
    router.push("/posts/create");
  };
  const { data: posts } = useQuery("posts", postsRequest.get);

  return (
    <>
      <Button className="top_button" type="primary" onClick={addPostHandler}>
        Add new post
      </Button>
      <Row>
        {posts &&
          posts.map((item) => (
            <Col
              className="col-12 col-sm-8 col-lg-6 col-xl-4 col-xxl-3"
              key={item.id}
            >
              <PostCard
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                date={item.date}
                author={item.author}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Posts;
