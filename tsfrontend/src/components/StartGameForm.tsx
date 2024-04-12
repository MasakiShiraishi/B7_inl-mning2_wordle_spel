import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate för calling WordInput.jsx

type StartGameFormProps= {
  onWordSubmit: (word: string) => void;
  onStartGame?: (wordLength: number, allowRepeats: boolean) => void; 
}
// export default function StartGameForm() { 
  const StartGameForm: FC<StartGameFormProps> = () => { 
  const [wordLength, setWordLength] = useState(5);
  const [allowRepeats, setAllowRepeats] = useState(false);
  // const [selectedWord, setSelectedWord] = useState<string | undefined>(undefined)
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  // to use hook(useNavigate())
  const navigate = useNavigate(); 

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
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
    // console.log(data.word); 
    // setSelectedWord(data.word);
    console.log(startTime);
    gameStartTime;
    navigate('/guess', { state: { word: data.word, wordLength, allowRepeats, startTime } }); 
    
  } else {
    // Handle errors
    console.error('Failed to start game');
  }
};
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h4>Game Settings</h4>
        <label className="settings-word-length">Word Length:</label>
        <input type="number" value={wordLength} onChange={(e) => setWordLength(Number(e.target.value))} min="4"
          max="15" />
      </div>
      <div className='settings-div2'>
        <label className='settings-allow-repeats'>
        Allow Repeats </label>
          <input  type="checkbox" checked={allowRepeats} onChange={(e) => setAllowRepeats(e.target.checked)} />
          
       
      </div>
      <button className='button-start-game' type="submit">Start Game</button>
     
    </form>
   
    
  );
}

export default StartGameForm;
