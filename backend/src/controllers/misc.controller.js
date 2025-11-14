import { pool } from "../db/pool.js";

// ✅ Colleges
export const getColleges = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM College ORDER BY college_id");
    res.json(rows);
  } catch (err) {
    console.error("❌ getColleges:", err.message);
    res.status(500).json({ error: "Failed to fetch colleges" });
  }
};

export const getTotalStudentsInCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const [[row]] = await pool.query(
      "SELECT GetTotalStudentsInCollege(?) AS total_students",
      [id]
    );
    res.json(row);
  } catch (err) {
    console.error("❌ getTotalStudentsInCollege:", err.message);
    res.status(500).json({ error: "Failed to fetch student count" });
  }
};

// ✅ Mentors
export const getMentors = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT mentor_id, first_name, last_name, dob FROM Mentor ORDER BY mentor_id"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ getMentors:", err.message);
    res.status(500).json({ error: "Failed to fetch mentors" });
  }
};

// ✅ Certificates
export const getCertificates = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        ct.certificate_id, 
        ct.issue_date, 
        ct.internship_id, 
        ct.status,      -- ✅ ADD THIS
        i.field AS internship_field 
      FROM Certificate ct
      LEFT JOIN Internship i ON ct.internship_id = i.internship_id
      ORDER BY ct.certificate_id;
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ getCertificates:", err.message);
    res.status(500).json({ error: "Failed to fetch certificates" });
  }
};


// ✅ Job Offers
export const getJobOffers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT jo.offer_id, jo.role, jo.package, jo.location, jo.internship_id
      FROM Job_Offer jo
      ORDER BY jo.offer_id;
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ getJobOffers:", err.message);
    res.status(500).json({ error: "Failed to fetch job offers" });
  }
};

// ✅ Feedback
export const getFeedback = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT f.feedback_id, f.comment, f.mentor_id, f.company_id 
      FROM Feedback f
      ORDER BY f.feedback_id;
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ getFeedback:", err.message);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

// ✅ Goodies
export const getGoodies = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT g.goodie_id, g.hoodie, g.cup, g.bottle, g.internship_id 
      FROM Goodies g
      ORDER BY g.goodie_id;
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ getGoodies:", err.message);
    res.status(500).json({ error: "Failed to fetch goodies" });
  }
};
// ✅ Add Feedback
export const addFeedback = async (req, res, next) => {
  try {
    const { comment, mentor_id, company_id } = req.body;

    if (!comment || !mentor_id || !company_id) {
      return res.status(400).json({ error: "All fields are required (comment, mentor_id, company_id)" });
    }

    const [result] = await pool.query(
      `INSERT INTO Feedback (comment, mentor_id, company_id)
       VALUES (?, ?, ?)`,
      [comment, mentor_id, company_id]
    );

    res.json({
      message: "✅ Feedback added successfully",
      feedback_id: result.insertId,
    });
  } catch (err) {
    console.error("❌ addFeedback error:", err);
    res.status(500).json({ error: err.sqlMessage || "Failed to add feedback" });
  }
};

// ✅ Add Goodies
export const addGoodies = async (req, res, next) => {
  try {
    const { internship_id, hoodie, cup, bottle } = req.body;

    if (!internship_id) {
      return res.status(400).json({ error: "Internship ID is required" });
    }

    const [result] = await pool.query(
      `INSERT INTO Goodies (internship_id, hoodie, cup, bottle)
       VALUES (?, ?, ?, ?)`,
      [internship_id, hoodie ?? 0, cup ?? 0, bottle ?? 0]
    );

    res.json({
      message: "✅ Goodies record added successfully",
      goodie_id: result.insertId,
    });
  } catch (err) {
    console.error("❌ addGoodies error:", err);
    res.status(500).json({ error: err.sqlMessage || "Failed to add goodies" });
  }
};

export const issueCertificate = async (req, res) => {
  try {
    const { internship_id } = req.body;

    if (!internship_id) {
      return res.status(400).json({ error: "Internship ID is required" });
    }

    // Insert OR update certificate for this internship
    const [result] = await pool.query(
      `
      INSERT INTO Certificate (internship_id, issue_date, status)
      VALUES (?, CURDATE(), 'Issued')
      ON DUPLICATE KEY UPDATE
         issue_date = VALUES(issue_date),
         status = VALUES(status)
      `,
      [internship_id]
    );

    // Determine certificate ID (works for both insert/update)
    const certificateId = result.insertId || result.insertId === 0 
      ? result.insertId 
      : (await pool.query(
          "SELECT certificate_id FROM Certificate WHERE internship_id = ?",
          [internship_id]
        ))[0][0].certificate_id;

    // Fetch updated certificate details
    const [[created]] = await pool.query(
      `SELECT certificate_id, internship_id, issue_date, status 
       FROM Certificate
       WHERE certificate_id = ?`,
      [certificateId]
    );

    res.json(created);

  } catch (err) {
    console.error("Issue Certificate Error:", err);
    res.status(500).json({ error: err.sqlMessage || err.message });
  }
};
