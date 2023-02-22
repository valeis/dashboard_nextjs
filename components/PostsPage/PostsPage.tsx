import { Button, Col, Loader, Row } from "ebs-design";
import { useRef, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";

import postsRequest from "@/api/posts";
import PostCard from "../PostCard/PostCard";

import "./PostsPage";

const Posts = () => {
  const observerElem = useRef(null);
  const router = useRouter();
  
  const addPostHandler = () => {
    router.push("/posts/create");
  };
  
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "posts",
    ({pageParam = 1}) => postsRequest.get(pageParam), 
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage, allPages)
        const nextPage = allPages.length + 1
        return lastPage.length !== 0 ? nextPage : undefined
      }
    }
  );

  const handleObserver = useCallback((entries:any) => {
    const [target] = entries
    if (target.isIntersecting && hasNextPage){
     fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  useEffect(() => {
    const element = observerElem.current
    const option = { threshold: 0}

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element!)
    return () => observer.unobserve(element!)
  }, [fetchNextPage, hasNextPage, handleObserver])


  return (
    <>
      <Button className="top_button" type="primary" onClick={addPostHandler}>
        Add new post
      </Button>
      <Row>
        {isSuccess && data.pages?.map(page =>
          page.map((item) => (
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
          ))
        )}
      </Row>

      <div ref={observerElem}>
        {isFetchingNextPage && hasNextPage && <Loader loading/>}
      </div>
    </>
  );
};

export default Posts;
