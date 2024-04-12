import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li className="navbar"><Link to="/">Home</Link></li>
        <li className="navbar"><Link to="/project">Projekt</Link></li>
        <li className="navbar"><Link to="/highscores">High Scores</Link></li>
      </ul>
    </nav>
  );
}

