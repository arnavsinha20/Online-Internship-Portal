import { Router } from "express";
import {
  getStudentDetails,
  getStudentAge,
  getAllStudents,
  countApplicationsByStatus,
  hasAcceptedApplication,
  deleteStudent,
  updateStudentDetails,
} from "../controllers/students.controller.js";

const r = Router();

r.get("/", getAllStudents);
r.get("/:id/details", getStudentDetails);
r.get("/:id/age", getStudentAge);
r.get("/:id/applications/count", countApplicationsByStatus);
r.get("/:id/has-accepted", hasAcceptedApplication);
r.delete("/:id", deleteStudent);
r.put("/:id/update", updateStudentDetails);

export default r;
