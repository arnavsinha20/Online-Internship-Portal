import { pool } from "../db/pool.js";

export const addFeedback = async (req, res, next) => {
  try {
    const { comment, mentor_id, company_id } = req.body;
    await pool.query(
      `INSERT INTO Feedback (comment, mentor_id, company_id) VALUES (?, ?, ?)`,
      [comment, mentor_id, company_id]
    );
    res.json({ message: "Feedback added successfully!" });
  } catch (err) {
    next(err);
  }
};
