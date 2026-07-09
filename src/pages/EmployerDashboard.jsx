import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/Footer';
import './Dashboard.css';

export default function EmployerDashboard() {
  return (
    <>
      <div className="jobs-hero">
        <DashboardNavbar />
        <div className="jobs-hero__content">
          <span className="jobs-eyebrow">Employer Dashboard</span>
          <h1>Manage your job posts.</h1>
          <p className="jobs-hero__text">
            Post jobs, review applicants, and manage your hiring process in one place.
          </p>
        </div>
      </div>

      <section className="dashboard">
        <div className="dashboard-card">
          <h3>Post a New Job</h3>
          <p>Create a new job listing for candidates to apply.</p>
          <button className="btn btn--primary">Post Job</button>
        </div>

        <div className="dashboard-card">
          <h3>Active Job Posts</h3>
          <p>View and manage the jobs your company has published.</p>
          <button className="btn btn--primary">View Jobs</button>
        </div>

        <div className="dashboard-card">
          <h3>Applicants</h3>
          <p>Review candidates who applied to your openings.</p>
          <button className="btn btn--primary">View Applicants</button>
        </div>
      </section>

      <Footer />
    </>
  );
}