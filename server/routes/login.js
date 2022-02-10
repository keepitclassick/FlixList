const express = require("express");
const router = express.Router();

module.exports = ({ getUserByEmail }) => {
  router.get("/", (req, res) => {
    res.send;
  });

  router.post("/", (req, res) => {
    const { email: userEmail } = req.body;
    const { password: userPassword } = req.body;

    getUserByEmail(userEmail)
      .then((user) => {
        if (user.password === userPassword) {
          res.json(user);
        } else {
          res.json(false);
        }
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
