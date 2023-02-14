import React, { useContext, useEffect } from "react";
import { Checkbox, Form, Input, Select, Button, useForm } from "ebs-design";
import Link from "next/link";
import { useMutation} from "react-query";
import { useRouter } from 'next/router'

import { User } from "@/types/User";
import usersRequest from "@/api/users";
import Card from "../Card/Card";
import AuthContext from "@/store/auth-context";


import "./RegistrationForm";
const RegistrationForm = () => {
  const [form] = useForm();
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.isLoggedIn){
      router.push('/dashboard');
    }
  }, [authCtx.isLoggedIn, router])

  const registerUser = async (user: User) => {
    let data = await usersRequest.post(user);
    return data;
  };

  const { mutate } = useMutation(registerUser, {
    onSuccess: () => {
      router.push('login');
    },
    onError: () => {
      console.log("Some error occured during registration!");
    }
  });

  return (
    <Card className="input_registration">
      <div className="formHeader_registration ">
        <h1>Register</h1>
      </div>

      <Form
        form={form}
        validateMessages={{
          // eslint-disable-next-line no-template-curly-in-string
          required: "Câmpul ”${label}” nu poate să fie gol",
        }}
        onFinish={(values) => {
          const user = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            gender: values.gender,
            password: values.password,
            role: "Moderator",
          };
          mutate(user);
        }}
        controlOptions={{
          col: {
            size: 12,
          },
        }}
        labelOptions={{
          col: {
            size: 12,
          },
        }}
        type="vertical"
      >
        <Form.Field
          label="Nume"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="text" />
        </Form.Field>

        <Form.Field
          label="Prenume"
          name="surname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="text" />
        </Form.Field>

        <Form.Field
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="email" />
        </Form.Field>

        <Form.Field
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                text: "Masculin",
                value: "male",
              },
              {
                text: "Femenin",
                value: "female",
              },
              {
                text: "Mă abțin",
                value: "none",
              },
            ]}
          />
        </Form.Field>

        <Form.Field
          label="Parola"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" />
        </Form.Field>

        <Form.Field
          label="Confirmare parola"
          name="confirm_password"
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              async validator(_, value) {
                if (getFieldValue("password") !== value) {
                  return Promise.reject("Parolele introduse nu corespund");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Field>

        <Form.Field
          name="confirmations"
          rules={[
            {
              required: true,
              async validator(rule, value) {
                value
                  ? await Promise.resolve()
                  : await Promise.reject(
                      "Pentru a continua trebuie să fiți de acord cu prelucrarea datelor personale!"
                    );
              },
            },
          ]}
        >
          <Checkbox text="Sunt deacord cu prelucrarea datelor personale" />
        </Form.Field>
        <div className="ebs-button">
          <Button type="primary" submit={true}>
            Register
          </Button>
          <Link href="/login">
            <Button type="ghost">Log in</Button>
          </Link>
        </div>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
