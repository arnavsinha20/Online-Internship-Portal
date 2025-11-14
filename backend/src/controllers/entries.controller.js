import { pool } from "../db/pool.js";

// ✅ INSERT STUDENT
export const insertStudent = async (req, res, next) => {
  try {
    const { first_name, last_name, dob, college_id, mentor_id } = req.body;

    const sql = `
      CALL InsertStudent(?, ?, ?, ?, ?, @sid);
      SELECT @sid AS student_id;
    `;

    const [result] = await pool.query(sql, [
      first_name,
      last_name,
      dob,
      college_id,
      mentor_id
    ]);

    const id = result[1][0].student_id;

    res.json({
      message: "Student inserted successfully",
      student_id: id
    });
  } catch (err) {
    next(err);
  }
};

// ✅ INSERT COMPANY
export const insertCompany = async (req, res, next) => {
  try {
    const { name, type, location, contact } = req.body;

    const sql = `
      CALL InsertCompany(?, ?, ?, ?, @cid);
      SELECT @cid AS company_id;
    `;

    const [result] = await pool.query(sql, [
      name,
      type,
      location,
      contact
    ]);

    const id = result[1][0].company_id;

    res.json({
      message: "Company inserted successfully",
      company_id: id
    });
  } catch (err) {
    next(err);
  }
};

// ✅ INSERT COLLEGE
export const insertCollege = async (req, res, next) => {
  try {
    const { name, address, contact } = req.body;

    const sql = `
      CALL InsertCollege(?, ?, ?, @cid);
      SELECT @cid AS college_id;
    `;

    const [result] = await pool.query(sql, [
      name,
      address,
      contact
    ]);

    const id = result[1][0].college_id;

    res.json({
      message: "College inserted successfully",
      college_id: id
    });
  } catch (err) {
    next(err);
  }
};

// ✅ INSERT MENTOR
export const insertMentor = async (req, res, next) => {
  try {
    const { first_name, last_name, dob } = req.body;

    const sql = `
      CALL InsertMentor(?, ?, ?, @mid);
      SELECT @mid AS mentor_id;
    `;

    const [result] = await pool.query(sql, [
      first_name,
      last_name,
      dob
    ]);

    const id = result[1][0].mentor_id;

    res.json({
      message: "Mentor inserted successfully",
      mentor_id: id
    });
  } catch (err) {
    next(err);
  }
};
