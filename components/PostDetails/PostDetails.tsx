import React from "react";
import { useQuery } from "react-query";
import * as AiIcons from "react-icons/io";
import { Button, Loader, Space } from "ebs-design";
import { useRouter } from 'next/router';
import postsRequest from "@/api/posts";

import "./PostDetails";
import Image from "next/image";

const PostDetails = () => { 
  const router = useRouter();
  const postId = router.query.postId?.toString();
  const parse = require('html-react-parser');

  const { data, isLoading } = useQuery(["posts", postId], ()=>postsRequest.getById(postId),
    {
     onError: () => router.push("/posts")
    }
  );


  if(isLoading) return <Loader loading/>

  return (
    <div>
      <Space justify="center">
        <h1>{data?.title}</h1>
      </Space>
      <Space align="center" justify="space-around" direction="horizontal">
        <Button
          size="large"
          type="light"
          onClick={() => {
            router.push("/posts");
          }}
          prefix={<AiIcons.IoIosArrowDropleft size="35px" />}
        ></Button>
        <Space direction="vertical" size="small" align="end">
          <h2 className="author">{data?.author}</h2>
          <p className="blog-date">Published {data?.date}</p>
        </Space>
      </Space>
      <div className="blog-wrap">
        <Image src={data?.image!} alt="cover" width={550} height={420} />
      </div> 
      <p className="blog-desc">{parse(data?.description)}</p>
    </div>
  )
};

export default PostDetails;
