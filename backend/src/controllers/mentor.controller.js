// mentor.controller.js
import { pool } from "../db/pool.js";

export const getAllMentors = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Mentor");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getMentorIdByStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [[row]] = await pool.query("SELECT GetMentorIdByStudent(?) AS mentor_id", [id]);
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignMentor = async (req, res) => {
  try {
    const { student_id, mentor_id } = req.body;

    if (!student_id || !mentor_id)
      return res.status(400).json({ error: "student_id and mentor_id required" });

    await pool.query("UPDATE Student SET mentor_id = ? WHERE student_id = ?", [
      mentor_id,
      student_id,
    ]);

    res.json({ message: "Mentor assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
