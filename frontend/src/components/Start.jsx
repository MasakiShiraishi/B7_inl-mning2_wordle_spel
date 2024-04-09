import StartGameForm from "./StartGameForm";

export default function Start(){  
      const handleStartGame = (wordLength, allowRepeats) => {      
        console.log(wordLength, allowRepeats);     
      };      
    
   return(
          <div>
               <h1>Game Setting Page</h1>  
               <StartGameForm onStartGame={handleStartGame} />
               
          </div>
   )
}