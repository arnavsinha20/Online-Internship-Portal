import { BrowserRouter, Routes, Route } from "react-router-dom";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Action pages
import ApplyInternship from "./pages/ApplyInternship";
import AddInternship from "./pages/AddInternship";
import IssueCertificate from "./pages/IssueCertificate";
import DeleteStudent from "./pages/DeleteStudent";
import StudentDetails from "./pages/StudentDetails";
import UpdateApplicationStatus from "./pages/UpdateApplicationStatus";
import CompanyStats from "./pages/CompanyStats";
import AssignMentor from "./pages/AssignMentor";
import StudentDetailsTool from "./pages/StudentDetailsTool";

// ✅ NEW ENTRY PAGES
import AddStudent from "./pages/AddStudent";
import AddCompany from "./pages/AddCompany";
import AddCollege from "./pages/AddCollege";
import AddMentor from "./pages/AddMentor";


// Analytics pages
import StatsByField from "./pages/StatsByField";
import CollegeStudentCount from "./pages/CollegeStudentCount";
import CompanyNameLookup from "./pages/CompanyNameLookup";
import InternshipDuration from "./pages/InternshipDuration";
import StudentAge from "./pages/StudentAge";
import ApplicationCount from "./pages/ApplicationCount";
import HasAccepted from "./pages/HasAccepted";
import GetMentorByStudent from "./pages/GetMentorByStudent";


// Data pages
import Students from "./pages/Students";
import Companies from "./pages/Companies";
import Colleges from "./pages/Colleges";
import Mentors from "./pages/Mentors";
import Internships from "./pages/Internships";
import Applications from "./pages/Applications";
import Certificates from "./pages/Certificates";
import JobOffers from "./pages/JobOffers";
import Feedback from "./pages/Feedback";
import Goodies from "./pages/Goodies";
// New Pages (add these)
import UpdateStudent from "./pages/UpdateStudent";
import AddFeedback from "./pages/AddFeedback";
import AddGoodies from "./pages/AddGoodies";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Actions */}
        <Route path="/apply" element={<ApplyInternship />} />
        <Route path="/internship/add" element={<AddInternship />} />
        <Route path="/issue-certificate" element={<IssueCertificate />} />
        <Route path="/delete-student" element={<DeleteStudent />} />
        <Route path="/update-application-status" element={<UpdateApplicationStatus />} />
        <Route path="/company-stats" element={<CompanyStats />} />
        <Route path="/assign-mentor" element={<AssignMentor />} />
        <Route path="/student-details" element={<StudentDetailsTool />} />

        {/* ✅ NEW ENTRY ROUTES */}
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/add-college" element={<AddCollege />} />
        <Route path="/add-mentor" element={<AddMentor />} />
        <Route path="/update-student" element={<UpdateStudent />} />
        <Route path="/add-feedback" element={<AddFeedback />} />
        <Route path="/add-goodies" element={<AddGoodies />} />




        {/* Analytics */}
        <Route path="/avg-stipend" element={<StatsByField />} />
        <Route path="/college-count" element={<CollegeStudentCount />} />
        <Route path="/company-name" element={<CompanyNameLookup />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/internship-duration" element={<InternshipDuration />} />
        <Route path="/student-age" element={<StudentAge />} />
        <Route path="/application-count" element={<ApplicationCount />} />
        <Route path="/has-accepted" element={<HasAccepted />} />
        <Route path="/mentor-by-student" element={<GetMentorByStudent />} />


        {/* Data */}
        <Route path="/students" element={<Students />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/job-offers" element={<JobOffers />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/goodies" element={<Goodies />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
