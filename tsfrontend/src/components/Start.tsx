import StartGameForm from "./StartGameForm";

export default function Start(){  
      const handleStartGame = (wordLength: number, allowRepeats: boolean) => {      
        console.log(wordLength, allowRepeats);     
      };      
      const handleWordSubmit = (word: string) => {
         console.log("Submitted Word:", word);
      }; 
    
   return(
          <div>
               <h2>Game Setting Page</h2>  
               <StartGameForm onStartGame={handleStartGame} onWordSubmit={handleWordSubmit}/>
               
          </div>
   )
}