import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

export default function Registration(props) {
  const [usersName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    Axios.post("http://localhost:3001/api/users", {
      name: usersName,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        const user = JSON.stringify(res.data.email);
        localStorage.setItem("userID", user);
      })
      .catch((err) => {
        console.log(err);
      });
    props.setRegister(false);
    props.setLoggedIn(true);
  };

  return (
    <div id="register-form">
      <Form id="register">
        <h1>Register Now!</h1>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            class="reg"
            id="email"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            class="reg"
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            class="reg"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            id="regSubmit"
            variant="dark"
            type="submit"
            onClick={register}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
