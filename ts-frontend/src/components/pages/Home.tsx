import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate('/start');
  };

  return (
    <div>
      <h2>Word Game</h2>
      <button className="button-start-game" onClick={handleStartClick}>Start Game</button>
    </div>
  );
}
