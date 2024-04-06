
import React, { useState, useEffect } from 'react';

export default function Score({ feedback, gameActive, setGameActive, gameStatus, setGameStatus  }) {
  const [score, setScore] = useState(100);
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (gameActive) {
      // Update game time every second
      interval = setInterval(() => {
      setGameTime((preTime) => preTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);

    }
    
    return () => clearInterval(interval); // Cleanup on unmount or when gameActive changes
  }, [gameActive]);
  useEffect(() => {
      if (score <= 0) {
      setGameActive(false);
      setGameStatus('lost');
      setScore(0);
    }
  }, [score, setGameActive, setGameStatus]);
  // Updating points based on feedback
  useEffect(() => {
    if (Array.isArray(feedback)) {      
      feedback.forEach((item) => {
        if (item.color === 'yellow') {
          setScore((prevScore) => prevScore - 1);
        } else if (item.color === 'red') {
          setScore((prevScore) => prevScore - 2);
        }         
    });
    
    }
  }, [feedback]);

  return (
    <div>
      <p>Score: {score}</p>
      <p>Game Time: {gameTime} seconds</p>
      {gameStatus === 'won' && <p>Congratulations, you've won!</p>}
      {gameStatus === 'lost' && <p>Game Over. Better luck next time!</p>}
   
    </div>
  );
}
