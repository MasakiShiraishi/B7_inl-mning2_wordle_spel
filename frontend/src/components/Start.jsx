import StartGameForm from "./StartGameForm";

export default function Start(){  
      const handleStartGame = (wordLength, allowRepeats) => {      
        console.log(wordLength, allowRepeats);     
      };      
    
   return(
          <div>
               <h2>Game Setting Page</h2>  
               <StartGameForm onStartGame={handleStartGame} />
               
          </div>
   )
}