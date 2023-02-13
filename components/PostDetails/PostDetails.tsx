import React, { useContext } from "react";
import { QueryClient, useQuery } from "react-query";
import * as AiIcons from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Loader, Space } from "ebs-design";
import { useRouter } from 'next/router';
import postsRequest from "@/api/posts";

import "./PostDetails";
import Image from "next/image";
import AuthContext from "@/store/auth-context";

const PostDetails = () => { 
  const router = useRouter();

  const { data, isFetching } = useQuery(
    ["posts", router.query["id"]],
    () => postsRequest.getById(router.query.postId?.toString()),
    { onError: () => router.push("/posts") }
  );

  if(isFetching) return <Loader loading/>

  return data ? (
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
      <p className="blog-desc">{data?.description}</p>
    </div>
  ) : (
    <Loader fade fixed height="100%" loading size="regular">
      Loaded
    </Loader>
  );
};

export default PostDetails;
