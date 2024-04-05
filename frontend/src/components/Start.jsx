import StartGameForm from "./StartGameForm";

export default function Start(){  
      const handleStartGame = (wordLength, allowRepeats) => {      
        console.log(wordLength, allowRepeats);     
      };
//       // Example of managing game settings state in App
// const [gameSettings, setGameSettings] = React.useState({ wordLength: 5, allowRepeats: false });

// const handleStartGame = (wordLength, allowRepeats) => {
//   setGameSettings({ wordLength, allowRepeats });
//   // Navigation is handled within StartGameForm, so only update settings here
// };          
    
   return(
          <div>
               <h1>Game Setting Page</h1>  
               <StartGameForm onStartGame={handleStartGame} />
               
          </div>
   )
}