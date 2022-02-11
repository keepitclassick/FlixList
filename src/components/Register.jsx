import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import Axios from "axios";

export default function Registration(props) {
  const [usersName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [cell, setCell] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const register = (e) => {
    Axios.post("http://localhost:3001/api/users", {
      name: usersName,
      email: email,
      phone_number: cell,
      password: password,
      location: location,
    })
      .then((res) => {
        const user = JSON.stringify(res.data);
        localStorage.setItem("userID", user);
      })
      .catch((err) => {
        console.log(err);
      });
    props.setLoggedIn(true);
  };

  const fileHandler = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const fileUploadHandler = (e) => {};

  return (
    <div id="background">
      <form id="upload">
        <label for="file">File to upload</label>
        <input type="file" id="file" accept="image/*" onChange={fileHandler} />
        <div id="app"></div>

        <button onClick={fileUploadHandler}>Upload</button>
      </form>
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
        </Form.Group>
        <Button variant="dark" type="submit" onClick={register}>
          Submit
        </Button>
        Already have an account? <a href="/login">Log in</a> here!
      </Form>
    </div>
  );
}
