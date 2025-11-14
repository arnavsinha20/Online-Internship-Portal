import { pool } from "../db/pool.js";

export const addInternship = async (req, res, next) => {
  try {
    const { field, stipend, mode, start_date, end_date, company_id } = req.body;

    const sql = `
      CALL AddInternship(?, ?, ?, ?, ?, ?, @iid);
      SELECT @iid AS internship_id;
    `;

    const [result] = await pool.query(sql, [
      field, stipend, mode, start_date, end_date, company_id,
    ]);

    const id = result[1][0].internship_id;

    res.json({ message: "Internship created", internship_id: id });
  } catch (err) {
    next(err);
  }
};

export const getInternshipDuration = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      "SELECT GetInternshipDuration(?) AS duration",
      [req.params.id]
    );
    res.json(result[0]);
  } catch (err) {
    next(err);
  }
};

export const getAllInternships = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT i.*, c.name AS company_name FROM Internship i LEFT JOIN Company c ON i.company_id = c.company_id ORDER BY i.internship_id`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};


export const getAverageStipendByField = async (req, res, next) => {
  try {
    const { field } = req.params;
    const [[row]] = await pool.query(
      `SELECT GetAverageStipendByField(?) AS avg_stipend`,
      [field]
    );
    res.json(row);
  } catch (err) {
    next(err);
  }
};
