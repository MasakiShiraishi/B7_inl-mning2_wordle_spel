import React, { useEffect, useState } from 'react';

export default function Highscore() {
  const [highscores, setHighscores] = useState([]); 

  useEffect(() => {
    
    async function loadHighscores() {
      const response = await fetch('http://localhost:5080/highscore');
      if (!response.ok) {
        // Handle errors, e.g., by logging them or showing an error message
        console.error('Server responded with an error:', response.statusText);
        return;
      }
      const payload = await response.json();
      setHighscores(payload.highscores);
    }
    // const fetchHighscores = async () => {
    //   try {
    //     const response = await fetch('/highscore');
    //     const data = await response.json();
    //     setHighscores(data.highscore); 
    //   } catch (error) {
    //     console.error('Failed to fetch highscores:', error);
    //   }
    // };
    loadHighscores();
  }, []); 

  return (
    <div>
      <h2>This is highscore page</h2>
      <h4>highscore highscore</h4>
      <ul>
      <p>test</p>
        {highscores.map((score, index) => (
          <li className="highscore-list"key={index}>
            {score.name}: {score.score} points
          </li>
        ))}
      </ul>
    </div>
  );
}
