import { Router } from "express";
import { insertStudent, insertCompany, insertCollege, insertMentor } from "../controllers/newEntries.controller.js";

const r = Router();

r.post("/student", insertStudent);
r.post("/company", insertCompany);
r.post("/college", insertCollege);
r.post("/mentor", insertMentor);

export default r;
