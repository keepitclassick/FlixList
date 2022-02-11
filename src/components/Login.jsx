import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Login(props) {
  const [user, setCurrentUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    console.log(data);

    axios
      .post("/api/login", data)
      .then((res) => {
        setCurrentUser(res.data);
        const user = JSON.stringify(res.data.email);
        localStorage.setItem("userID", user);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Incorrect email or password");
      });
    props.setLoggedIn(true);
  };

  return (
    <div class="Login">
      <Form action="/action_page.php" class="container">
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="btn">
          <button type="submit" onClick={login}>
            Login
          </button>
        </div>
      </Form>
    </div>
  );
}
