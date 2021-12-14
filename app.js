const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const port = 3000

const controllers = require('./queries')

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/projects', controllers.getProjects)
app.get('/project/:pid/:cid', controllers.getProjectChallengeById)
app.post('/projects', controllers.postProject)

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })