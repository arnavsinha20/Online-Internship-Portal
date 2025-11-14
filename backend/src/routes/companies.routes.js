import { 
  getCompanyStats,
  getAllCompanies,
  getCompanyNameById
} from "../controllers/companies.controller.js";
import { Router } from "express";

const r = Router();

// Get all companies
r.get("/", getAllCompanies);

// Company Statistics (Procedure)
r.get("/:id/stats", getCompanyStats);

// Get Company Name by ID (Function)
r.get("/:id/name", getCompanyNameById);

export default r;
