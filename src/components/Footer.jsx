import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="reviews">
      <span>© 2026 JOBNET. All rights reserved.</span>
      <Link to="/signin">Sign in to get started →</Link>
    </footer>
  );
}
