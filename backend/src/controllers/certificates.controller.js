import { pool } from "../db/pool.js";

export const issueCertificate = async (req, res, next) => {
  try {
    const { student_id, company_id, status } = req.body;

    const sql = `
      CALL IssueCertificate(?, ?, ?);
    `;

    await pool.query(sql, [student_id, company_id, status]);

    res.json({ message: "Certificate issued successfully!" });
  } catch (err) {
    next(err);
  }
};

export const getAllCertificates = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, s.first_name, s.last_name, cmp.name AS company_name
      FROM Certificate c
      LEFT JOIN Student s ON c.student_id = s.student_id
      LEFT JOIN Company cmp ON c.company_id = cmp.company_id
      ORDER BY c.certificate_id DESC
    `);

    res.json(rows);
  } catch (err) {
    next(err);
  }
};
