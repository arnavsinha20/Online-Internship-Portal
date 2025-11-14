import { Router } from "express";
import {
  getColleges,
  getMentors,
  getCertificates,
  getJobOffers,
  getFeedback,
  issueCertificate ,
  getGoodies,
  getTotalStudentsInCollege,
  addFeedback,      // ✅ NEW
  addGoodies,
} from "../controllers/misc.controller.js";

const r = Router();

// ✅ Colleges
r.get("/colleges", getColleges);
r.get("/colleges/:id/total-students", getTotalStudentsInCollege);

// ✅ Mentors
r.get("/mentors", getMentors);

// ✅ Certificates, Job Offers, Feedback, Goodies
r.get("/certificates", getCertificates);
r.get("/job-offers", getJobOffers);
r.get("/feedback", getFeedback);
r.get("/goodies", getGoodies);
r.post("/feedback/add", addFeedback);
r.post("/goodies/add", addGoodies);
r.post("/certificates/issue", issueCertificate);

export default r;
