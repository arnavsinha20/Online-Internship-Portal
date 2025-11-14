import { Router } from "express";
import {
  insertStudent,
  insertCompany,
  insertCollege,
  insertMentor
} from "../controllers/entries.controller.js";

const r = Router();

// 4 new entry endpoints
r.post("/student", insertStudent);
r.post("/company", insertCompany);
r.post("/college", insertCollege);
r.post("/mentor", insertMentor);

export default r;
