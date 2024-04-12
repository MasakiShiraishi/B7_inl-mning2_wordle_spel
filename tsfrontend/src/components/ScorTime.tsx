
import React, { useState, useEffect, FC } from 'react';
// import Game from './Game';
// import StartGameForm from './StartGameForm';
// import Feedback from './Feedback';
import { useLocation, useNavigate } from 'react-router-dom';

type ScoreProps = {
  feedback:  {
    letter: string;
    color: string;
  }[];
  // gameActive: boolean;
  setGameActive: React.Dispatch<React.SetStateAction<boolean>>;
  gameStatus: 'won' | 'lost' | 'active';
  setGameStatus: React.Dispatch<React.SetStateAction<'won' | 'lost' | 'active'>>;
  guessesWords: string[];
}

// wordLength, selectedWord
const Score:FC<ScoreProps> = ({ feedback, setGameActive, gameStatus, setGameStatus, guessesWords,   }) => {
  const [score, setScore] = useState(100);
  const [gameTime, setGameTime] = useState(0);
  const [name, setName] = useState("");
  const [endTime, setEndTime] = useState<Date | null>(null);
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
  const handleHighScoreSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const duration = Math.floor((endTime.getTime() - startTimeDate.getTime()) / 1000);      
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
      <p className='ScoreTime-score'>Score: {score}</p>
      <p className='ScoreTime-game-time'>Game Time: {gameTime} seconds</p>
      {gameStatus === 'won' && <p className='ScoreTime-game-result-msg'>Congratulations, you've won!</p>}
      {gameStatus === 'lost' && <p className='ScoreTime-game-result-msg'>Game Over. Better luck next time!</p>}
      <form onSubmit={handleHighScoreSubmit}>
          <input className='ScoreTime-input'
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Your name"
          />
          <input className='ScoreTime-button' type="submit" />
        </form>
     
    </div>
  );

}
return (
  <div>
    <p className='ScoreTime-score'>Score: {score}</p>      
           
  </div>
);
}

export default Score;