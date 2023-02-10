import React, {useContext, useState } from "react";
import { Form, Input, Button, useForm } from "ebs-design";
import { useRouter } from 'next/router'
import Link from "next/link";

import AuthContext from "@/store/auth-context";
import Card from "../Card/Card";
import SSRLocalStorage from "@/utils/SSRLocalStorage";

import './LoginForm'

const LoginForm = () => {
  const [form] = useForm();
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  
  const [logged, setLogged] = useState(false);

  return (
    <div>
      <Card className={"input_login"}>
        <div className={"formHeader_login"}>
          <h1>Login</h1>
        </div>
        <Form
          form={form}
          validateMessages={{
            // eslint-disable-next-line no-template-curly-in-string
            required: "Câmpul ”${label}” nu poate să fie gol",
          }}
          onFinish={async (values) => {
            authCtx.login(values);
            setLogged(!authCtx.isAuth)
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

          <div className="ebs-button">
          <Button type="primary" submit={true}>
            Log in
          </Button>

          <Link href="/register">
            <Button type="ghost">Register</Button>
          </Link>  
          </div>
          {logged && <span className="span_login">Utilizatorul dat nu a fost găsit în sistem !</span>}
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
