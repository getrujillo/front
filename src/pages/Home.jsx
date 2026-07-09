import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import './Home.css';

const CATEGORIES = [
  { title: 'Popular Searches', tags: ['Remote', 'Full-time', 'Internship', 'Freelance', 'Part-time'] },
  { title: 'Role Titles', tags: ['Software Engineer', 'Product Designer', 'Data Analyst', 'Sales Rep'] },
  { title: 'Locations', tags: ['Vancouver', 'Toronto', 'Remote', 'Montreal'] },
  { title: 'Companies', tags: ['Startups', 'Enterprise', 'Agencies', 'Non-profit'] },
];

const TRUST_STATS = [
  { number: '10k+', label: 'Jobs listed' },
  { number: '500+', label: 'Verified companies' },
  { number: '24h', label: 'Average response' },
  { number: '95%', label: 'Trusted by job seekers' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  }

  return (
    <>
      <div className="hero-bg">
        <div className="hero-rings"><span></span><span></span></div>
        <Navbar />

        <section className="hero">
          <span className="hero-badge">Verified jobs · Fast applications</span>
          <h1>Find your next<br />job in minutes.</h1>
          <p>Search verified opportunities, apply faster, and track your next career move with confidence.</p>

          <form className="search-bar" onSubmit={handleSearch}>
            <label className="search-field">
              <input
                type="text"
                placeholder="Job title, keyword or company"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>

            <label className="search-field">
              <input
                type="text"
                placeholder="City or location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>

            <button type="submit" className="btn btn--primary">Find Now</button>
          </form>
        </section>
      </div>

      <section className="trust-bar">
  <div className="trust-item">
    <h2>10K+</h2>
    <span>Jobs Listed</span>
  </div>

  <div className="trust-divider"></div>

  <div className="trust-item">
    <h2>500+</h2>
    <span>Verified Companies</span>
  </div>

  <div className="trust-divider"></div>

  <div className="trust-item">
    <h2>24h</h2>
    <span>Average Response</span>
  </div>

  <div className="trust-divider"></div>

  <div className="trust-item">
    <h2>95%</h2>
    <span>Hiring Success</span>
  </div>
</section>

      <section className="categories" id="find-job">
        <div className="categories__grid">
          {CATEGORIES.map((cat) => (
            <div className="category-card" key={cat.title}>
              <h3>{cat.title}</h3>
              <div className="category-card__tags">
                {cat.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks />

      <Footer />
    </>
  );
}