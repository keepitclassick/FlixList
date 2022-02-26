const express = require("express");
const router = express.Router();

module.exports = ({ getUsers, getUserByEmail, addUser }) => {
  /* GET users listing. */
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/posts", (req, res) => {
    getUsersPosts()
      .then((usersPosts) => {
        const formattedPosts = getPostsByUsers(usersPosts);
        res.json(formattedPosts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const { name, email, password, photo } = req.body;

    getUserByEmail(email)
      .then((user) => {
        if (user) {
          res.json({
            msg: "Sorry, a user account with this email already exists",
          });
        } else {
          return addUser(name, email, password, photo);
        }
      })
      .then((newUser) => res.json(newUser))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
