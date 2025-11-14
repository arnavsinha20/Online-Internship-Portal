import express from "express";
import {
  getAllMentors,
  getMentorIdByStudent,
  assignMentor,
} from "../controllers/mentor.controller.js";

const r = express.Router();

r.get("/", getAllMentors);
r.get("/student/:id", getMentorIdByStudent);
r.post("/assign", assignMentor);

export default r;
