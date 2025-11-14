import { pool } from "../db/pool.js";

export const addGoodies = async (req, res, next) => {
  try {
    const { internship_id, hoodie, cup, bottle } = req.body;
    await pool.query(
      `INSERT INTO Goodies (internship_id, hoodie, cup, bottle)
       VALUES (?, ?, ?, ?)`,
      [internship_id, hoodie, cup, bottle]
    );
    res.json({ message: "Goodies record inserted successfully!" });
  } catch (err) {
    next(err);
  }
};
