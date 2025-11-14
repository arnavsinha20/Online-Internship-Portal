import { Link } from 'react-router-dom';

export default function DataHub(){
  return (
    <div className="app-container">
      <h1 style={{ marginTop: 0 }}>Data Hub</h1>
      <p className="lead">Quick access to all tables and administrative data. Click any card to view details.</p>

      <div className="grid" style={{ marginTop: 12 }}>
        {[
          { to: '/colleges', title: 'Colleges', desc: 'Colleges and addresses' },
          { to: '/mentors', title: 'Mentors', desc: 'Mentor list and contact' },
          { to: '/companies', title: 'Companies', desc: 'Company stats and internships' },
          { to: '/students', title: 'Students', desc: 'Student profiles and contacts' },
          { to: '/internships', title: 'Internships', desc: 'Open internships and details' },
          { to: '/applications', title: 'Applications', desc: 'Applications and statuses' },
          { to: '/certificates', title: 'Certificates', desc: 'Issued certificates' },
          { to: '/job-offers', title: 'Job Offers', desc: 'Job offers from internships' },
          { to: '/feedback', title: 'Feedback', desc: 'Feedback from companies/mentors' },
          { to: '/goodies', title: 'Goodies', desc: 'Goodies issued for internships' }
        ].map(item => (
          <Link key={item.to} to={item.to} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>{item.title}</h3>
            <p className="text-muted">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
