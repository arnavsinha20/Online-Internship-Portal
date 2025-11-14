import { Router } from "express";
import { applyForInternship, updateApplicationStatus, getAllApplications } from "../controllers/applications.controller.js";

const r = Router();

r.post("/apply", applyForInternship);
r.patch("/status", updateApplicationStatus);
r.get("/", getAllApplications);

export default r;
