import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate('/start');
  };

  return (
    <div>
      <h1>Word Game</h1>
      <button onClick={handleStartClick}>Start Game</button>
    </div>
  );
}
