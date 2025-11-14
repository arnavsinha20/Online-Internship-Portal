import { Router } from "express";
import {
  addInternship,
  getInternshipDuration,
  getAllInternships,
  getAverageStipendByField
} from "../controllers/internships.controller.js";

const r = Router();

r.post("/add", addInternship);
r.get("/", getAllInternships);   // ✅ LIST ALL INTERNSHIPS
r.get("/:id/duration", getInternshipDuration);
r.get("/field/:field/avg-stipend", getAverageStipendByField);

export default r;
