import './App.css';
import './Feedback.css';
// Import necessary components from react-router-dom for routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import Highscore from './components/pages/Highscore';
import Home from './components/pages/Home';

import Game from './components/Game';
import StartGameForm from './components/StartGameForm';
import Start from './components/Start';

function App() {  
  const handleWordSubmit = (word) => {
    console.log(word);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/highscores" element={<Highscore />} />
        <Route
          path="/start"
          element={<Start />} />
        <Route
          path="/start-game"
          element={<StartGameForm onWordSubmit={handleWordSubmit} />}
        />
        <Route
          path="/guess"
          element={<Game/>}
        />
        {/* added a route to "WordInput" */}
        {/* <Route
          path="/guess"
          element={<Game onWordSubmit={handleWordSubmit} />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
