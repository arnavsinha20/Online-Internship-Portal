import { pool } from "../db/pool.js";

export const getStudentDetails = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      "CALL GetStudentDetails(?);",
      [req.params.id]
    );
    res.json(result[0][0]);
  } catch (err) {
    next(err);
  }
};

export const getStudentAge = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      "SELECT GetStudentAge(?) AS age",
      [req.params.id]
    );
    res.json(result[0]);
  } catch (err) {
    next(err);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.student_id, s.first_name, s.last_name, s.dob,
              c.name AS college_name,
              CONCAT(m.first_name, ' ', m.last_name) AS mentor_name
       FROM Student s
       LEFT JOIN College c ON s.college_id = c.college_id
       LEFT JOIN Mentor m ON s.mentor_id = m.mentor_id
       ORDER BY s.student_id`);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const countApplicationsByStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const [result] = await pool.query(
      `SELECT CountApplicationsByStatus(?, ?) AS count`,
      [id, status]
    );
    res.json(result[0]);
  } catch (err) {
    next(err);
  }
};

export const hasAcceptedApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT HasAcceptedApplication(?) AS hasAccepted`,
      [id]
    );
    res.json(result[0]);
  } catch (err) {
    next(err);
  }
};
export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM Student WHERE student_id = ?`, [id]);
    res.json({ message: "Student deleted (if allowed by triggers)" });
  } catch (err) {
    next(err); // trigger violation will be caught by errorHandler and shown as 400
  }
};
export const updateStudentDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, dob, college_id, mentor_id } = req.body;

    const [result] = await pool.query(
      `UPDATE Student 
       SET first_name = ?, last_name = ?, dob = ?, college_id = ?, mentor_id = ?
       WHERE student_id = ?`,
      [first_name, last_name, dob, college_id, mentor_id, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Student not found" });

    res.json({ message: "Student details updated successfully" });
  } catch (err) {
    next(err);
  }
};
