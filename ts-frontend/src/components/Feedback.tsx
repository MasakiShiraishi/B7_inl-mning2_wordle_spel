import { FC } from "react";

type FeedbackProps ={
  feedback:{
    letter: string;
    color: string;
  }[],
  guess?:string,
}


// export default function Feedback({ feedback, guess }) {
const Feedback:FC<FeedbackProps> = ({ feedback }) =>{
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
export default Feedback;


