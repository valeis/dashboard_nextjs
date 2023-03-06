import { Button, Col, Loader, Row } from "ebs-design";
import { useRef, useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  move,
  swap
} from "react-grid-dnd";

import { StrictModeDroppable as Droppable } from "@/utils/StrictModeDroppable";

import postsRequest from "@/api/posts";
import PostCard from "../PostCard/PostCard";

import "./PostsPage";
import { errorMonitor } from "events";
import { Card } from "@/types/Card";

const Posts = () => {
  const observerElem = useRef(null);
  const router = useRouter();

  const addPostHandler = () => {
    router.push("/posts/create");
  };

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    "posts",
    ({ pageParam = 1 }) => postsRequest.getPerPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.length !== 0 ? nextPage : undefined;
      },
    }
  );

  const [posts, updatePosts] = useState(data?.pages || []);

  let pageIndex = data?.pages && data!.pages.length - 2;


  useEffect(() => {
    data?.pages && updatePosts(data?.pages);
  }, [data]);

  // function onChange(sourceId:any, sourceIndex:any, targetIndex:any, targetId:any) {
  //   const nextState = swap(posts, sourceIndex, targetIndex);
  //   updatePosts(nextState);
  // }
  
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const postsOnPage = [...posts];

    const [reorderedItem] = postsOnPage[pageIndex!].splice(
      result.source.index,
      1
    );
    postsOnPage[pageIndex!].splice(result.destination.index, 0, reorderedItem);
    console.log(result);
    updatePosts(postsOnPage);
  };

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element!);
    return () => observer.unobserve(element!);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error...</p>;
  } else {
    content = (
      // <DragDropContext onDragEnd={handleOnDragEnd}>
      //   <Droppable droppableId="posts">
      //     {(provided) => (
      //       <section {...provided.droppableProps} ref={provided.innerRef}>
      //         <Row>
      //           {isSuccess &&
      //             data!.pages?.map((page) =>
      //               page.map((item, index) => (
      //                 <Col
      //                   className="col-12 col-sm-8 col-lg-6 col-xl-4 col-xxl-3"
      //                   key={item.id}
      //                 >
      //                   <Draggable
      //                     key={item.id}
      //                     draggableId={item.id!.toString()}
      //                     index={index}
      //                   >
      //                     {(provided) => (
      //                       <article
      //                         ref={provided.innerRef}
      //                         {...provided.draggableProps}
      //                         {...provided.dragHandleProps}
      //                       >
      //                         <PostCard
      //                           id={item.id}
      //                           title={item.title}
      //                           description={item.description}
      //                           image={item.image}
      //                           date={item.date}
      //                           author={item.author}
      //                         />
      //                       </article>
      //                     )}
      //                   </Draggable>
      //                   {provided.placeholder}
      //                 </Col>
      //               ))
      //             )}
      //         </Row>
      //       </section>
      //     )}
      //   </Droppable>
      // </DragDropContext>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        
          {isSuccess &&
            data!.pages?.map((page, index) => (
              <Droppable droppableId={index.toString()} key={index} direction="horizontal">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Row>
                    {page.map((item, index) => (
                      <Draggable
                        draggableId={item.id!.toString()}
                        index={index}
                        key={item.id}
                      >
                        {(provided) => (
                          <Col
                            className="col-12 col-sm-8 col-lg-6 col-xl-4 col-xxl-3 col"
                            key={item.id}
                          >
                            <article
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <PostCard
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                date={item.date}
                                author={item.author}
                              />
                            </article>
                          </Col>
                        )}
                        
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    </Row>  
                  </div>
                )}
              </Droppable>
            ))}
        
      </DragDropContext>

      // <Row>
      //   {isSuccess && data.pages?.map(page =>
      //     page.map((item) => (
      //       <Col
      //         className="col-12 col-sm-8 col-lg-6 col-xl-4 col-xxl-3"
      //         key={item.id}
      //       >
      //         <PostCard
      //           id={item.id}
      //           title={item.title}
      //           description={item.description}
      //           image={item.image}
      //           date={item.date}
      //           author={item.author}
      //         />
      //       </Col>
      //     ))
      //   )}
      // </Row>

    //   <GridContextProvider onChange={onChange}>
    //   <GridDropZone
    //     id="items"
    //     boxesPerRow={4}
    //     rowHeight={520}
    //     style={{ height: "520px" }}
    //   >
    //     {isSuccess && data.pages?.map(page =>
    //        page.map((item) => (
    //       <GridItem key={item.id} >
    //         <div
    //           style={{
    //             width: "100%",
    //             height: "100%"
    //           }}
    //         >
    //           <PostCard
    //              id={item.id}
    //              title={item.title}
    //              description={item.description}
    //              image={item.image}
    //              date={item.date}
    //              author={item.author}
    //            />
    //         </div>
    //       </GridItem>
    //     )))}
    //   </GridDropZone>
    // </GridContextProvider>
    );
                        }
  return (
    <>
      <Button className="top_button" type="primary" onClick={addPostHandler}>
        Add new post
      </Button>
      {content}
      <div ref={observerElem}>
        {isFetchingNextPage && hasNextPage ? <Loader loading /> : ""}
      </div>
    </>
  );
};

export default Posts;
