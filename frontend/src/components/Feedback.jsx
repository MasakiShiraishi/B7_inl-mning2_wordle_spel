

export default function Feedback({ feedback, guess }) {
  return (
    <div>
    {feedback.map((fb, index) => (
      <span key={index}  className="letterBox" 
      style={{ marginRight: '10px', color: fb.color }}>
        {fb.letter}
      </span>
    ))}
  </div>
    
  );
}



