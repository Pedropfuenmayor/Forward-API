const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const projectsRoutes = require("./routes/projects");

const usersRoutes = require("./routes/users");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/users", usersRoutes);
app.use(projectsRoutes);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message , data: data});
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
