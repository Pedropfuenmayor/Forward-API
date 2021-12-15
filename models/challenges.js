const db = require("../util/database");

module.exports = class Challenge {
  constructor(id, name, projectId, challengeType) {
    this.id = id;
    this.name = name;
    this.projectId = projectId;
    this.challengeType= challengeType;
  }

  save() {
    return db.query(
      `INSERT INTO challenges(id, name, project_id, challenge_type)
      VALUES($1,$2,$3,$4)`,
      [this.id, this.name, this.projectId, this.challengeType ]
    );
  }

  static fetchAll(projectId) {
    return db.query(`SELECT 
        projects.id AS project_id, 
        projects.name AS project_name,
        challenges.id AS challenge_id,
        challenges.name AS challenge_name
        FROM projects
        INNER JOIN challenges ON projects.id = challenges.project_id
        WHERE projects.id = $1`,
        [projectId]
        );
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