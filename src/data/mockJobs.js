// Datos de ejemplo. BACKEND HOOK: reemplazar por la respuesta real de la API de empleos.
export const MOCK_JOBS = [
  { id: 1,  title: 'Frontend Developer',        company: 'Northwind Labs',   location: 'Vancouver, BC', type: 'Full-time', category: 'Engineering', remote: true,  salaryMin: 70000, salaryMax: 95000,  posted: '2 days ago', tags: ['React', 'CSS', 'TypeScript'] },
  { id: 2,  title: 'Backend Engineer (Node.js)', company: 'Rivergate Tech',   location: 'Toronto, ON',   type: 'Full-time', category: 'Engineering', remote: false, salaryMin: 80000, salaryMax: 110000, posted: '5 days ago', tags: ['Node.js', 'PostgreSQL'] },
  { id: 3,  title: 'Product Designer',           company: 'Studio Bloom',    location: 'Remote',        type: 'Contract',  category: 'Design',      remote: true,  salaryMin: 60000, salaryMax: 85000,  posted: '1 day ago',  tags: ['Figma', 'UX Research'] },
  { id: 4,  title: 'Data Analyst',                company: 'Harborline Co.', location: 'Montreal, QC',  type: 'Full-time', category: 'Data',        remote: false, salaryMin: 55000, salaryMax: 75000,  posted: '1 week ago', tags: ['SQL', 'Tableau'] },
  { id: 5,  title: 'Sales Representative',       company: 'BluePeak Retail', location: 'Calgary, AB',   type: 'Full-time', category: 'Sales',       remote: false, salaryMin: 45000, salaryMax: 65000,  posted: '3 days ago', tags: ['B2B', 'CRM'] },
  { id: 6,  title: 'Marketing Intern',            company: 'GreenLeaf Co-op', location: 'Remote',        type: 'Internship',category: 'Marketing',   remote: true,  salaryMin: 20000, salaryMax: 30000,  posted: 'Today',      tags: ['Social Media', 'SEO'] },
  { id: 7,  title: 'DevOps Engineer',             company: 'CloudPine',       location: 'Vancouver, BC', type: 'Full-time', category: 'Engineering', remote: true,  salaryMin: 95000, salaryMax: 130000, posted: '4 days ago', tags: ['AWS', 'Kubernetes'] },
  { id: 8,  title: 'Customer Support Specialist', company: 'Helpwise',        location: 'Remote',        type: 'Part-time', category: 'Support',     remote: true,  salaryMin: 35000, salaryMax: 45000,  posted: '6 days ago', tags: ['Zendesk', 'Communication'] },
  { id: 9,  title: 'UX Researcher',               company: 'Studio Bloom',    location: 'Toronto, ON',   type: 'Contract',  category: 'Design',      remote: false, salaryMin: 65000, salaryMax: 90000,  posted: '2 weeks ago',tags: ['User Interviews', 'Figma'] },
  { id: 10, title: 'Junior Accountant',           company: 'Ledgerline',      location: 'Ottawa, ON',    type: 'Full-time', category: 'Finance',     remote: false, salaryMin: 48000, salaryMax: 60000,  posted: '3 days ago', tags: ['Excel', 'QuickBooks'] },
  { id: 11, title: 'Mobile Developer (React Native)', company: 'Northwind Labs', location: 'Remote',     type: 'Full-time', category: 'Engineering', remote: true,  salaryMin: 75000, salaryMax: 100000, posted: '1 day ago', tags: ['React Native', 'iOS', 'Android'] },
  { id: 12, title: 'HR Coordinator',              company: 'Harborline Co.',  location: 'Montreal, QC',  type: 'Full-time', category: 'HR',          remote: false, salaryMin: 50000, salaryMax: 62000,  posted: '5 days ago', tags: ['Recruiting', 'Onboarding'] },
];

export const CATEGORIES = [...new Set(MOCK_JOBS.map((j) => j.category))];
export const JOB_TYPES = [...new Set(MOCK_JOBS.map((j) => j.type))];
