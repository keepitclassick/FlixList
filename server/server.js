const express = require("express");
const app = express();
const port = 3001;

app.get("/", function (req, res) {
  res.send("Server is responding");
});

app.listen(port, () => {
  console.log("App is listening on port 3001");
});
