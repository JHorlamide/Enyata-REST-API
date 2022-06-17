const express = require("express");
const config = require("./src/config/env.config.js");

const UsersRouter = require("./src/users/routes.config.js");

const app = express();
const PORT = config.port;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(express.json());
UsersRouter.routesConfig(app);

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}...`);
});

