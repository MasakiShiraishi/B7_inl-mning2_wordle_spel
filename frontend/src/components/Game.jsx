import React, { useState } from 'react';
import Feedback from './Feedback';
import Score from './ScorTime';
import { useLocation } from 'react-router-dom';

export default function Game() {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  // handling to game status
  const [gameStatus, setGameStatus] = useState('active'); 
  // using wordLength at guess typing which decided in StartGameForm.jsx
  const location = useLocation();
  const wordLength = location.state.wordLength;

  const handleGuessSubmit = async (e) => {
    e.preventDefault();
    setGameActive(true); 
      const response = await fetch('http://localhost:5080/guess', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guess: guess, // Make sure this variable is correctly defined and holds the value you want to send
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // You can use this data to do more things, like setting a state
        
         // if the prediction is correct, end the game
    if (data.isCorrect) {
      setGameActive(false); // set game to inactive state
      setGameStatus('won');
    }
        setGuesses(prevGuesses => {
          const newGuesses = [...prevGuesses, { guess, feedback: data.feedback }];
          console.log(newGuesses); 
          return newGuesses;
        });
        setFeedback(data.feedback); // Assuming your server responds with a feedback field
        setGuess('');
        // navigate('/guess'); 
      } else {
        // Handle errors
        console.error('Failed to game');
      }
    }; 

  return (
    <div>
      <form onSubmit={handleGuessSubmit}>
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Guess a word"
          minLength={wordLength}
          maxLength={wordLength}
        />
        <button type="submit">Guess</button>
      </form>
      <Score feedback={feedback} gameActive={gameActive} setGameActive={setGameActive} 
      gameStatus={gameStatus} setGameStatus={setGameStatus} />
      <div>
      <h3>Guess List</h3>
        {guesses.map((item, index) => (
          <div key={index}>
           
            <Feedback feedback={item.feedback} />
          </div>
        ))}
        </div>
    </div>
  );
}





