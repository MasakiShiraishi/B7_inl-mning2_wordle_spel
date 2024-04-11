import mongoose from "mongoose";

// Define the schema
const highscoreSchema = new mongoose.Schema({
  score: Number,
  startTime: String,
  name: String,
  guessesWords: [String],
  // guessesWords: [{
  //   guess: String,
  // }],
  selectedWord: String,
  wordLength: Number,
  endTime: String,
  gameTime: Number,
});

// Create the model based on the schema
const Highscore = mongoose.model('Highscore', highscoreSchema);


export { Highscore }