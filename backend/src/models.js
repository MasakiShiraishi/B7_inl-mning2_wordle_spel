import mongoose from "mongoose";

const Highscore = mongoose.model('Highscore', {
  score: Number,
  startTime: String,
  name: String,
  guessesWords: [String],
  selectedWord: String,
  wordLength: Number,
  endTime: String,
  gameTime: Number,
});

export { Highscore }