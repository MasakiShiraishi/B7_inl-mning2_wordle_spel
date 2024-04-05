

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
    // <div>
    //   {feedback.map((letter, index) => (
    //     <span key={index} className={`letter ${letter.status}`}>
    //       {letter.char}
    //     </span>
    //   ))}
    // </div>
  );
}




  //   <div>
  //   {feedback.map((item, index) => (
  //     <span key={index} style={{ color: item.color }}>
  //       {guess[index]}
  //     </span>
  //   ))}
  // </div>