import { pool } from "../db/pool.js";

export const applyForInternship = async (req, res, next) => {
  try {
    const { student_id, company_id } = req.body;

    const sql = `
      CALL ApplyForInternship(?, ?, @app_id);
      SELECT @app_id AS application_id;
    `;

    const [result] = await pool.query(sql, [student_id, company_id]);
    const id = result[1][0].application_id;

    res.json({ message: "Application submitted", application_id: id });
  } catch (err) {
    next(err);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { application_id, status } = req.body;

    const sql = `CALL UpdateApplicationStatus(?, ?);`;
    await pool.query(sql, [application_id, status]);

    res.json({ message: "Status updated" });
  } catch (err) {
    next(err);
  }
};

export const getAllApplications = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.application_id, a.status, a.student_id, a.company_id,
              CONCAT(s.first_name, ' ', s.last_name) AS student_name,
              c.name AS company_name
       FROM Application a
       LEFT JOIN Student s ON a.student_id = s.student_id
       LEFT JOIN Company c ON a.company_id = c.company_id
       ORDER BY a.application_id`);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
