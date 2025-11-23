import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          React Hooks Showcase
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link href="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/use-state" className="nav-link">useState</Link>
          </li>
          <li className="nav-item">
            <Link href="/use-effect" className="nav-link">useEffect</Link>
          </li>
          <li className="nav-item">
            <Link href="/use-ref" className="nav-link">useRef</Link>
          </li>
          <li className="nav-item">
            <Link href="/use-context" className="nav-link">useContext</Link>
          </li>
          <li className="nav-item">
            <Link href="/use-reducer" className="nav-link">useReducer</Link>
          </li>
          <li className="nav-item">
            <Link href="/use-memo" className="nav-link">useMemo</Link>
          </li>
          <li className="nav-item">
            <Link href="/use-callback" className="nav-link">useCallback</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}