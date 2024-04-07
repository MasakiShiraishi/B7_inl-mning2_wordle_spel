import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate för calling WordInput.jsx

export default function StartGameForm({ onStartGame }) {
  const [wordLength, setWordLength] = useState(5);
  const [allowRepeats, setAllowRepeats] = useState(false);
  const [selectedWord, setSelectedWord] = useState();
  const [gameStartTime, setGameStartTime] = useState(null);
  // to use hook(useNavigate())
  const navigate = useNavigate(); 

  const handleSubmit = async(e) => {
    e.preventDefault();
    const startTime = new Date();
    setGameStartTime(startTime);
    const response = await fetch('http://localhost:5080/start-game', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ length: Number(wordLength), allowRepeats: allowRepeats }),
   });

  if (response.ok) {
    const data = await response.json();
    console.log(data); // You can use this data to do more things, like setting a state
    console.log(data.word); 
    setSelectedWord(data.word);
    console.log(startTime);
    navigate('/guess', { state: { word: data.word, wordLength, allowRepeats, startTime } }); 
    
  } else {
    // Handle errors
    console.error('Failed to start game');
  }
};
  //   onStartGame?.(wordLength, allowRepeats);
  //   // Navigate to WordInput page after sending
  //   navigate('/start-game', { state: { wordLength, allowRepeats } });
  // };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Game Settings</h3>
        <label>Word Length:</label>
        <input type="number" value={wordLength} onChange={(e) => setWordLength(Number(e.target.value))} min="4"
          max="15" />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={allowRepeats} onChange={(e) => setAllowRepeats(e.target.checked)} />
          Allow Repeats
        </label>
      </div>
      <button type="submit">Start Game</button>
     
    </form>
   
    
  );
}
{/* <Score wordLength={wordLength} selectedWord={ selectedWord}/> */}

