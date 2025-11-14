import { Router } from "express";
import { issueCertificate, getAllCertificates } from "../controllers/certificates.controller.js";

const r = Router();

r.post("/issue", issueCertificate);          // ✅ ISSUE CERTIFICATE
r.get("/", getAllCertificates);              // ✅ LIST ALL

export default r;
