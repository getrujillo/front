import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MOCK_JOBS, CATEGORIES, JOB_TYPES } from '../data/mockJobs';
import './Jobs.css';

const MAX_SALARY = 140000;

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [minSalary, setMinSalary] = useState(0);

  function toggleFromList(list, setList, value) {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearchParams({ q: query, location });
  }

  function clearFilters() {
    setTypes([]);
    setCategories([]);
    setRemoteOnly(false);
    setMinSalary(0);
    setQuery('');
    setLocation('');
    setSearchParams({});
  }

  const results = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const search = query.toLowerCase();
      const place = location.toLowerCase();

      const matchesQuery =
        !query.trim() ||
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.tags.some((tag) => tag.toLowerCase().includes(search));

      const matchesLocation =
        !location.trim() || job.location.toLowerCase().includes(place);

      const matchesType = types.length === 0 || types.includes(job.type);
      const matchesCategory =
        categories.length === 0 || categories.includes(job.category);
      const matchesRemote = !remoteOnly || job.remote;
      const matchesSalary = job.salaryMax >= minSalary;

      return (
        matchesQuery &&
        matchesLocation &&
        matchesType &&
        matchesCategory &&
        matchesRemote &&
        matchesSalary
      );
    });
  }, [query, location, types, categories, remoteOnly, minSalary]);

  const activeFilterCount =
    types.length + categories.length + (remoteOnly ? 1 : 0) + (minSalary > 0 ? 1 : 0);

  return (
    <>
      <div className="jobs-hero">
        <Navbar />

        <div className="jobs-hero__content">
          <span className="jobs-eyebrow">Available jobs</span>
          <h1>Find the right job for you.</h1>
          <p className="jobs-hero__text">
            Browse current opportunities, filter by role, location, type, and apply when you find a match.
          </p>

          <form className="jobs-search-bar" onSubmit={handleSearchSubmit}>
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

            <button type="submit" className="btn btn--primary">
              Find Now
            </button>
          </form>
        </div>
      </div>

      <section className="jobs-body">
        <button
          className="filters-toggle"
          onClick={() => setFiltersOpen((value) => !value)}
          aria-expanded={filtersOpen}
        >
          Filters
          {activeFilterCount > 0 && (
            <span className="filters-badge">{activeFilterCount}</span>
          )}
        </button>

        <aside className={`filters ${filtersOpen ? 'is-open' : ''}`}>
          <div className="filters__header">
            <h2>Filters</h2>
            {activeFilterCount > 0 && (
              <button className="filters__clear" onClick={clearFilters}>
                Clear all
              </button>
            )}
          </div>

          <div className="filter-group">
            <h3>Job type</h3>
            {JOB_TYPES.map((type) => (
              <label className="filter-checkbox" key={type}>
                <input
                  type="checkbox"
                  checked={types.includes(type)}
                  onChange={() => toggleFromList(types, setTypes, type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Category</h3>
            {CATEGORIES.map((cat) => (
              <label className="filter-checkbox" key={cat}>
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggleFromList(categories, setCategories, cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Work mode</h3>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
              />
              <span>Remote only</span>
            </label>
          </div>

          <div className="filter-group">
            <h3>Minimum salary</h3>
            <input
              type="range"
              min="0"
              max={MAX_SALARY}
              step="5000"
              value={minSalary}
              onChange={(e) => setMinSalary(Number(e.target.value))}
              className="salary-slider"
            />
            <p className="salary-value">${minSalary.toLocaleString()}+ / year</p>
          </div>
        </aside>

        <main className="results">
          <div className="results__header">
            <div>
              <p className="results__label">Job opportunities</p>
              <h2>{results.length} job{results.length !== 1 ? 's' : ''} found</h2>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="results__empty">
              <p>No jobs match your filters.</p>
              <button className="btn btn--primary" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="results__list">
              {results.map((job) => (
                <article className="job-card" key={job.id}>
                  <div className="job-card__top">
                    <div>
                      <h3>{job.title}</h3>
                      <p className="job-card__company">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="job-card__posted">{job.posted}</span>
                  </div>

                  <p className="job-card__salary">
                    ${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} / year
                  </p>

                  <div className="job-card__tags">
                    <span className="tag tag--type">{job.type}</span>
                    {job.remote && <span className="tag tag--remote">Remote</span>}
                    {job.tags.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>

                  <button className="btn btn--primary job-card__apply">
                    Apply Now
                  </button>
                </article>
              ))}
            </div>
          )}
        </main>
      </section>

      <Footer />
    </>
  );
}