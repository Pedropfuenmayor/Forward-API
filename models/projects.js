const db = require("../util/database");

module.exports = class Project {
  constructor(id, name, userId) {
    this.id = id;
    this.name = name;
    this.userId = userId;
  }

  save() {
    return db.query(
      `INSERT INTO projects(id, name, user_id)
      VALUES($1,$2,$3)`,
      [this.id, this.name, this.userId]
    );
  }

  static fetchAll() {
    return db.query("SELECT * FROM projects");
  }

  static findById(projectId) {
    return db.query("SELECT * FROM projects WHERE id = $1", [projectId]);
  }

  static update(projectId, projectName) {
    return db.query(`UPDATE projects 
    SET name = $1
    WHERE id = $2
    `, [projectName,projectId]);
  }

  static delete(projectId){
    return db.query("DELETE FROM projects WHERE id = $1", [projectId]);
  }
};

const getProjects = (request, response) => {
  db.query("SELECT * FROM projects", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProjectChallengeById = (request, response) => {
  const { pid, cid } = request.params;
  db.query(
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
