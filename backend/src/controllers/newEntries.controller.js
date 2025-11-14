import { pool } from "../db/pool.js";

export const insertStudent = async (req, res, next) => {
  try {
    const { first, last, dob, college, mentor } = req.body;

    const sql = `
      CALL InsertStudent(?, ?, ?, ?, ?, @newId);
      SELECT @newId AS student_id;
    `;

    const [result] = await pool.query(sql, [
      first, last, dob, college, mentor
    ]);

    res.json({ message: "Student added", id: result[1][0].student_id });
  } catch (err) {
    next(err);
  }
};

export const insertCompany = async (req, res, next) => {
  try {
    const { name, type, location, contact } = req.body;

    const sql = `
      CALL InsertCompany(?, ?, ?, ?, @newId);
      SELECT @newId AS company_id;
    `;

    const [result] = await pool.query(sql, [
      name, type, location, contact
    ]);

    res.json({ message: "Company added", id: result[1][0].company_id });
  } catch (err) {
    next(err);
  }
};

export const insertCollege = async (req, res, next) => {
  try {
    const { name, address, contact } = req.body;

    const sql = `
      CALL InsertCollege(?, ?, ?, @newId);
      SELECT @newId AS college_id;
    `;

    const [result] = await pool.query(sql, [
      name, address, contact
    ]);

    res.json({ message: "College added", id: result[1][0].college_id });
  } catch (err) {
    next(err);
  }
};

export const insertMentor = async (req, res, next) => {
  try {
    const { first, last, dob } = req.body;

    const sql = `
      CALL InsertMentor(?, ?, ?, @newId);
      SELECT @newId AS mentor_id;
    `;

    const [result] = await pool.query(sql, [
      first, last, dob
    ]);

    res.json({ message: "Mentor added", id: result[1][0].mentor_id });
  } catch (err) {
    next(err);
  }
};
