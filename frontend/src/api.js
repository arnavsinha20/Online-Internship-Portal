import axios from "axios";

// ✅ Base API setup
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===========================
   🧩 APPLICATIONS
=========================== */
export const applyForInternship = (data) =>
  api.post("/applications/apply", data);

export const updateApplicationStatus = (id, status) =>
  api.patch("/applications/status", { application_id: id, status });

/* ===========================
   🧩 STUDENTS
=========================== */
export const getStudents = () => api.get("/students");

export const getStudentDetails = (id) => api.get(`/students/${id}/details`);

export const getStudentAge = (id) => api.get(`/students/${id}/age`);

export const getApplicationCount = (id, status) =>
  api.get(`/students/${id}/applications/count?status=${status}`);

export const hasAccepted = (id) => api.get(`/students/${id}/has-accepted`);

export const deleteStudentAPI = (id) => api.delete(`/students/${id}`);

/* ===========================
   🧩 INTERNSHIPS
=========================== */
export const getInternships = () => api.get("/internships");

export const addInternship = (data) => api.post("/internships/add", data);

export const getInternshipDuration = (id) =>
  api.get(`/internships/${id}/duration`);

export const getAvgStipendByField = (field) =>
  api.get(`/internships/field/${field}/avg-stipend`);

/* ===========================
   🧩 CERTIFICATES
=========================== */
export const issueCertificate = (data) =>
    api.post("/misc/certificates/issue", data);



export const getCertificates = () => api.get("/misc/certificates");

/* ===========================
   🧩 COMPANIES
=========================== */
export const getCompanies = () => api.get("/companies");

export const getCompanyStats = (id) => api.get(`/companies/${id}/stats`);

export const getCompanyName = (id) => api.get(`/companies/${id}/name`);

/* ===========================
   🧩 COLLEGES & MISC
=========================== */
export const getColleges = () => api.get("/misc/colleges");

export const getTotalStudentsInCollege = (id) =>
  api.get(`/misc/colleges/${id}/total-students`);

export const getMentors = () => api.get("/misc/mentors");

export const getJobOffers = () => api.get("/misc/job-offers");

export const getFeedback = () => api.get("/misc/feedback");

export const getGoodies = () => api.get("/misc/goodies");

/* ===========================
   🧩 MENTORS
=========================== */


// ✅ NEW FUNCTION
export const getMentorIdByStudent = (studentId) =>
  api.get(`/mentors/student/${studentId}`);

export const assignMentor = (data) => api.post("/mentors/assign", data);

/* ===========================
   ✅ HEALTH CHECK (Optional)
=========================== */
export const testDBConnection = () => api.get("/db-test");

/* ===========================
   ✅ DEFAULT EXPORT
=========================== */
export default api;
