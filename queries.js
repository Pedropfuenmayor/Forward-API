const Pool = require('pg').Pool;
const pool = new Pool({
  user: "",
  host: "",
  database: "",
  password: "",
  port: 5432,
});

const getProjects = (request, response) => {
  pool.query('SELECT * FROM projects', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProjectChallengeById = (request, response) => {
  const { pid, cid } = request.params;
  pool.query(
    `SELECT 
  projects.id AS project_id,
  projects.name AS project_name,
  challenges.id AS challenge_id,
  challenges.name AS challenge_name
  FROM projects
  INNER JOIN challenges ON projects.id = challenges.project_id
  WHERE projects.id = $1 
  AND challenges.id = $2`,
    [pid, cid],

    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const postProject = (request, response) => {
  const {projectName, userId} = request.body;
  pool.query(
    `INSERT INTO projects(name, user_id)
    VALUES($1,$2)`,
    [projectName, userId],

    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send('Project added!');;
    }
  );
};

module.exports = {
  getProjects,
  getProjectChallengeById,
  postProject,
};
