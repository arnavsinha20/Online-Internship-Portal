import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";

import newEntriesRoutes from "./routes/newEntries.routes.js";
import applicationsRoutes from "./routes/applications.routes.js";
import studentsRoutes from "./routes/students.routes.js";
import companiesRoutes from "./routes/companies.routes.js";
import internshipsRoutes from "./routes/internships.routes.js";
import miscRoutes from "./routes/misc.routes.js";
import mentorRoutes from "./routes/mentor.routes.js";
import entriesRoutes from "./routes/entries.routes.js";

import { pool } from "./db/pool.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// ✅ API route mounts
app.use("/api/new", newEntriesRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/internships", internshipsRoutes);
app.use("/api/misc", miscRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/entries", entriesRoutes);

// ❌ Removed /api/certificates (handled under misc)

// ✅ Health check
app.get("/", (req, res) => res.send("✅ Backend is running!"));

// ✅ DB connection check
app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS test");
    res.json({ db: "✅ Connected", result: rows });
  } catch (err) {
    res.json({ db: "❌ Not Connected", error: err.message });
  }
});

// ✅ Error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3001, () =>
  console.log(`✅ Backend running at http://localhost:${process.env.PORT || 3001}`)
);
