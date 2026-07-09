import { useState } from 'react';
import './HowItWorks.css';

/* ---------- Mini visuales de cada paso (mockups en CSS, sin imágenes externas) ---------- */

function ResumeMockup() {
  return (
    <div className="mockup mockup--resume">
      <div className="resume-card">
        <div className="resume-card__header">
          <div className="resume-card__avatar" />
          <div>
            <p className="resume-card__name">Estelle Darcy</p>
            <p className="resume-card__role">Content Creator</p>
          </div>
        </div>
        <div className="resume-card__section">
          <span className="resume-card__label">Experience</span>
          <div className="resume-card__line" style={{ width: '90%' }} />
          <div className="resume-card__line" style={{ width: '70%' }} />
        </div>
        <div className="resume-card__section">
          <span className="resume-card__label">Skills</span>
          <div className="resume-card__chips">
            <span className="mini-tag">Writing</span>
            <span className="mini-tag">SEO</span>
            <span className="mini-tag">Design</span>
          </div>
        </div>
      </div>
      <svg className="mockup__squiggle" viewBox="0 0 300 90" fill="none">
        <path d="M10 20 C 60 20, 60 80, 100 55 C 140 30, 170 90, 210 55 C 240 30, 260 20, 290 40"
          stroke="var(--accent-violet)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function SearchMockup() {
  return (
    <div className="mockup mockup--search">
      <div className="search-mock-bar">
        <span className="search-mock-bar__icon">🔍</span>
        <span className="search-mock-bar__text">Product designer</span>
      </div>
      <div className="search-mock-chips">
        <span className="mini-tag mini-tag--active">Remote</span>
        <span className="mini-tag">Full-time</span>
        <span className="mini-tag">$70k+</span>
        <span className="mini-tag">Toronto</span>
      </div>
      <div className="search-mock-results">
        <div className="search-mock-result" />
        <div className="search-mock-result" />
        <div className="search-mock-result search-mock-result--short" />
      </div>
    </div>
  );
}

function ApplyMockup() {
  return (
    <div className="mockup mockup--apply">
      <div className="apply-card">
        <div className="apply-card__top">
          <div className="apply-card__logo" />
          <div>
            <p className="resume-card__name">UX Researcher</p>
            <p className="resume-card__role">Studio Bloom · Toronto</p>
          </div>
        </div>
        <button type="button" className="apply-card__btn">Applied ✓</button>
      </div>
      <div className="apply-progress">
        <span className="apply-progress__dot is-done" />
        <span className="apply-progress__bar is-done" />
        <span className="apply-progress__dot is-done" />
        <span className="apply-progress__bar" />
        <span className="apply-progress__dot" />
      </div>
    </div>
  );
}

function HiredMockup() {
  return (
    <div className="mockup mockup--hired">
      <div className="hire-toast">
        <span className="hire-toast__icon">🎉</span>
        <div>
          <p className="resume-card__name">Offer accepted!</p>
          <p className="resume-card__role">Northwind Labs · Frontend Developer</p>
        </div>
      </div>
      <div className="hire-chat">
        <div className="hire-chat__bubble">Welcome to the team 👋</div>
        <div className="hire-chat__bubble hire-chat__bubble--me">Thank you, excited to start!</div>
      </div>
    </div>
  );
}

const STEPS = [
  {
    id: 'resume',
    title: 'Create Your Resume',
    bullets: ['Personal information', 'Work experience', 'Education', 'Skills', 'Certifications', 'Languages'],
    visual: ResumeMockup,
  },
  {
    id: 'search',
    title: 'Search for Jobs',
    bullets: [
      'Filter by role, location & salary',
      'Save your favorite searches',
      'Get instant alerts for new matches',
      'Browse verified companies',
    ],
    visual: SearchMockup,
  },
  {
    id: 'apply',
    title: 'Apply in One Click',
    bullets: [
      'Your resume auto-fills every application',
      'Track every application in one place',
      'No repetitive forms',
      'Add a personal note before sending',
    ],
    visual: ApplyMockup,
  },
  {
    id: 'hired',
    title: 'Get Hired',
    bullets: [
      'Get notified the moment employers respond',
      'Schedule interviews right in the app',
      'Message recruiters in real time',
      'Accept your offer and start the countdown',
    ],
    visual: HiredMockup,
  },
];

export default function HowItWorks() {
  const [openId, setOpenId] = useState('resume');

  return (
    <section className="how-it-works" id="how-it-works">
      <h2 className="how-it-works__title">How JOBNET Works</h2>

      <div className="accordion">
        {STEPS.map((step) => {
          const isOpen = openId === step.id;
          const Visual = step.visual;
          return (
            <div className={`accordion-item ${isOpen ? 'is-open' : ''}`} key={step.id}>
              <button
                type="button"
                className="accordion-item__header"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : step.id)}
              >
                {step.title}
                <span className="accordion-item__chevron">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="accordion-item__panel">
                  <div className="accordion-item__copy">
                    <p className="accordion-item__eyebrow">{step.title};</p>
                    <ul>
                      {step.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <Visual />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
