import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-2">Intern Portal</h1>
      <p className="lead mb-8">Welcome to the Internship Management System.</p>

      {/* Quick Actions */}
      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
      <div className="dashboard-grid">
        <DashboardCard title="Apply for Internship" desc="Submit an application." to="/apply" />
        <DashboardCard title="Add Internship" desc="Create new internship." to="/internship/add" />
        <DashboardCard title="Issue Certificate" desc="Give completion certificate." to="/issue-certificate" />
        <DashboardCard title="Delete Student" desc="Remove student record." to="/delete-student" />
        <DashboardCard title="Update Application Status" desc="Modify application state." to="/update-application-status" />
        <DashboardCard title="Company Statistics" desc="Company-wise stats." to="/company-stats" />
        <DashboardCard title="Assign Mentor" desc="Assign mentor to student." to="/assign-mentor" />
        <DashboardCard title="Update Student" desc="Modify student data" to="/update-student" />
      </div>

      {/* Data Management */}
      <h2 className="text-2xl font-bold mt-12 mb-4">Data Management</h2>
      <div className="dashboard-grid">
        <DashboardCard title="Students" desc="View all students." to="/students" />
        <DashboardCard title="Companies" desc="View all companies." to="/companies" />
        <DashboardCard title="Colleges" desc="View colleges." to="/colleges" />
        <DashboardCard title="Mentors" desc="View mentors." to="/mentors" />
        <DashboardCard title="Internships" desc="All internships." to="/internships" />
        <DashboardCard title="Applications" desc="View applications." to="/applications" />
        <DashboardCard title="Certificates" desc="Issued certificates." to="/certificates" />
        <DashboardCard title="Job Offers" desc="Job offers." to="/job-offers" />
        <DashboardCard title="Feedback" desc="Mentor/Company feedback." to="/feedback" />
        <DashboardCard title="Goodies" desc="Goodie distribution." to="/goodies" />
      </div>

      {/* Analytics & Tools */}
      <h2 className="text-2xl font-bold mt-12 mb-4">Analytics & Tools</h2>
      <div className="dashboard-grid">
        <DashboardCard title="Average Stipend" desc="Field-wise stipend average." to="/avg-stipend" />
        <DashboardCard title="Students in College" desc="Total students per college." to="/college-count" />
        <DashboardCard title="Company Name Lookup" desc="Find company name." to="/company-name" />
        <DashboardCard title="Internship Duration" desc="Days between start & end." to="/internship-duration" />

        <DashboardCard title="Applications Count" desc="Count application statuses." to="/application-count" />
        <DashboardCard title="Has Accepted Application" desc="Check if a student is already accepted." to="/has-accepted" />

        <DashboardCard title="Student Age" desc="Get calculated age." to="/student-age" />
        <DashboardCard
  title="Mentor by Student"
  desc="Find mentor ID assigned to a student."
  to="/mentor-by-student"
/>

      </div>

      {/* New Entries */}
      <h2 className="text-2xl font-bold mt-12 mb-4">New Entries</h2>
      <div className="dashboard-grid">
        <DashboardCard title="Add Student" desc="Insert a new student." to="/add-student" />
        <DashboardCard title="Add Company" desc="Insert a new company." to="/add-company" />
        <DashboardCard title="Add College" desc="Insert a new college." to="/add-college" />
        <DashboardCard title="Add Mentor" desc="Insert a new mentor." to="/add-mentor" />
        
        <DashboardCard title="Add Feedback" desc="Submit feedback" to="/add-feedback" />
        <DashboardCard title="Add Goodies" desc="Record goodies distribution" to="/add-goodies" />

      </div>

    </div>
  );
}
