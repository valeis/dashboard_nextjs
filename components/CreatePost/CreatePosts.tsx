import postsRequest from "@/api/posts";
import AuthContext from "@/store/auth-context";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Space,
    Textarea,
    useForm,
  } from "ebs-design";
  import React, { useState,  useContext } from "react";
  import { useMutation, useQuery, useQueryClient } from "react-query";
  import { useRouter } from 'next/router'
  import Link from "next/link";
  
  import { Card as CardType} from "@/types/Card"
  import Card from "../Card/Card";
  
  import "./CreatePosts";
  
  const CreatePosts = () => {
    
    const authCtx = useContext(AuthContext);
    const [form] = useForm();
    const router = useRouter();
    const postId = router.query.postId?.toString();
    
    const queryClient = useQueryClient();
    
    let postAuthor: string | undefined = ""!;
    const [ author, setAuthor ] = useState("")

  
    useQuery(["posts", postId], () => postsRequest.getById(postId), {
      
      enabled: !!postId,
      onSuccess: (data) => {
        form.setFieldsValue(data);
        setAuthor(data.author!);
      },
    });
  
    const publishPost = async (post: CardType) => {
      let data = await postsRequest.post(post);
      return data;
    };
  
    const updatePost = async (post: CardType) => {
      let data = await postsRequest.put(router.query.postId?.toString(), post);
      return data;
    };
  
    const update = useMutation(updatePost, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        router.push("/posts");
      },
      onError: () => {
        console.log("Some error occured");
      }
    });
  
  
    const { mutate } = useMutation(publishPost, {
      onSuccess: (data) => {
        router.push("/posts");
      },
      onError: () => {
        console.log("Some error occured");
      }
    });
  
  
    return (
      <Card className="create_posts">
        <div className="formHeader_posts">
          {router.query.postId?.toString() ? <h1>Edit post</h1> : <h1>Add a new post</h1>}
        </div>
        <Form
          form={form}
          validateMessages={{
            // eslint-disable-next-line no-template-curly-in-string
            required: "Câmpul ”${label}” nu poate să fie gol",
          }}
          onFinish={(values) => {
            if (router.query.postId?.toString() == null){
              postAuthor = authCtx.currentUser?.name;
            } else {
              postAuthor = author
            }
            const post = {
              title: values.title,
              description: values.description,
              image: values.image,
              date: values.date,
              author: postAuthor
            };
            if (router.query.postId?.toString() == null){
              mutate(post);
            } else {
              update.mutate(post);
            }
          }}
          controlOptions={{
            col: {
              size: 12,
            },
          }}
          type="vertical"
        >
          <Form.Field
            label="Titlu"
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="text" />
          </Form.Field>
  
          <Form.Field
            label="Descrierea postării"
            name="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Textarea></Textarea>
          </Form.Field>
  
          <Form.Field
            label="Link-ul către imagine"
            name="image"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="text" />
          </Form.Field>
  
          <Form.Field
            label="Data"
            name="date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker />
          </Form.Field>
  
          {
            <Space justify="center">
              <Link href="/posts">
                <Button type="ghost" size="medium">
                  Cancel
                </Button>
              </Link>
  
              <Button type="fill" size="medium" submit={true}>
                Publish
              </Button>
            </Space>
          }
        </Form>
      </Card>
    );
  };
  
  export default CreatePosts;
  