
import React, { useState, useEffect } from 'react';
import Game from './Game';
import StartGameForm from './StartGameForm';
import Feedback from './Feedback';
import { useLocation, useNavigate } from 'react-router-dom';


// wordLength, selectedWord
export default function Score({ feedback, gameActive, setGameActive, gameStatus, setGameStatus, guessesWords,   }) {
  const [score, setScore] = useState(100);
  const [gameTime, setGameTime] = useState(0);
  const [name, setName] = useState("");
  const [endTime, setEndTime] = useState(null);
  const location = useLocation();
  const selectedWord = location.state.word;
  const wordLength = location.state.wordLength;
  const startTime  = location.state.startTime;

  const highscore = {
    score,
    startTime,
    name,
    guessesWords,
    wordLength,
    selectedWord,
    endTime,
    gameTime,
  }
// console.log(wordLength);
  // setting navigate to "SendFeedback"
  const navigate = useNavigate();
  const handleHighScoreSubmit = async (e) => {
    e.preventDefault();
    setGameActive(true); 
    try{
      const response = await fetch('http://localhost:5080/highscore', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          highscore: highscore, // Make sure this variable is correctly defined and holds the value you want to send
        }),        
      });
      if(response.ok){
        navigate('/send-feedback');
      }else{
        console.error('Failed to submit highscore');
      }
    } catch (error) {
      console.error('Error submitting highscore:', error);
      }
    }

  useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'lost') {
      const endTime = new Date();  
      setEndTime(endTime);    
      const startTimeDate = new Date(startTime);     
      const duration = parseInt((endTime - startTimeDate) / 1000);      
      console.log(`Game Duration: ${duration} seconds`);
      setGameTime(duration);
    }
  }, [gameStatus, startTime]);
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

  if(gameStatus === 'won' || gameStatus === 'lost'){
  return (
    <div>
      <p>Score: {score}</p>
      <p>Game Time: {gameTime} seconds</p>
      {gameStatus === 'won' && <p>Congratulations, you've won!</p>}
      {gameStatus === 'lost' && <p>Game Over. Better luck next time!</p>}
      <form onSubmit={handleHighScoreSubmit}>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Your name"
          />
          <input type="submit" />
        </form>
     
    </div>
  );

}
return (
  <div>
    <p>Score: {score}</p>      
           
  </div>
);
}
