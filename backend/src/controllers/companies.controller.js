import { pool } from "../db/pool.js";

export const getCompanyStats = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      "CALL GetCompanyStatistics(?);",
      [req.params.id]
    );
    res.json(result[0][0]);
  } catch (err) {
    next(err);
  }
};

export const getAllCompanies = async (req, res, next) => {
  try {
    // First, get list of companies
    const [companies] = await pool.query(`SELECT company_id FROM Company ORDER BY company_id`);

    // For each company, call the stored procedure GetCompanyStatistics and collect results
    const results = [];
    for (const c of companies) {
      const [r] = await pool.query(`CALL GetCompanyStatistics(?);`, [c.company_id]);
      // r[0][0] contains the row from the procedure
      results.push(r[0][0] || { company_id: c.company_id });
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
};

export const getCompanyNameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[row]] = await pool.query(
      `SELECT GetCompanyName(?) AS company_name`,
      [id]
    );
    res.json(row);
  } catch (err) {
    next(err);
  }
};