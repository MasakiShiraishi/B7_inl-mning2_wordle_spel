import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import session from 'express-session';
import startGame from './src/gameLogic.js';
//--------för mongoDB----------------
import mongoose from 'mongoose';
import { Highscore } from './src/models.js';

// mongoose.connect(process.env.DB_URL);

mongoose.connect('mongodb+srv://masakishiraishi83:BUq2200tgGMONUOn@cluster0.1myropf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
//-------------------------------
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.get('/', async (req, res) => {
  const html = await fs.readFile('../frontend/dist/index.html');
  res.type('html').send(html);
});

app.get('/highscore', async(req, res) => {
  //--------för mongoDB----------
  const highscores = await Highscore.find();
  res.json({ highscores });
});

// Use the function in the route handler
app.post('/start-game', startGame);

// const correctWord = 'komanechi';
app.post('/guess', (req, res) => {
  const guess = req.body.guess.toUpperCase();
  const correctWord = req.session.correctWord.toUpperCase();
  
  console.log(`Selected word: ${correctWord}`);
  if (typeof correctWord === 'undefined') {
    return res.status(400).json({ success: false, message: 'Word not found' });
  }  
  let feedback = [];
  // Initialize a copy of the correctWord to track letters used for yellow feedback
  let remainingLetters = correctWord.split('');

  // Check if the guess is correct (isCorrect flag)
  const isCorrect = guess === correctWord;

  // Simple example of feedback logic
  for (let i = 0; i < guess.length; i++) {
    if (correctWord[i] === guess[i]) {
      feedback.push({ letter: guess[i], color: 'green' });
       // Remove the letter from remainingLetters to avoid using it again for yellow feedback
       remainingLetters[i] = null;
    }  else if (remainingLetters.includes(guess[i])) {
      // Misplaced letter (yellow)
      feedback.push({ letter: guess[i], color: 'yellow' });
      // Remove the first occurrence of the letter from remainingLetters
      const indexToRemove = remainingLetters.indexOf(guess[i]);
      if (indexToRemove !== -1) remainingLetters[indexToRemove] = null;
    } else {
      // Incorrect letter (red)
      feedback.push({ letter: guess[i], color: 'red' });
    }
  }
  res.json({ success: true, feedback: feedback, isCorrect: isCorrect });
});

// app.post('/highscore', async(req,res) =>{
//   const highscoreData = req.body
//   console.log(req.body);
//   const highscoreModel = new Highscore(highscoreData);
//   await highscoreModel.save();
 

//   const savedData = await Highscore.findById(highscoreModel._id);
//   console.log('Saved data:', savedData);

//   res.status(201).json(savedData); 
// });
app.post('/highscore', async(req, res) => {
  try {
    //  with const highscoreData = req.body
    //  expected : Saved data: { _id: new ObjectId('66112ec9674e7c3eca95248e'), __v: 0 }
    const highscoreData = req.body.highscore;
    console.log(highscoreData);
    const highscoreModel = new Highscore(highscoreData);
    await highscoreModel.save();

    const savedData = await Highscore.findById(highscoreModel._id);
    console.log('Saved data:', savedData);

    res.status(201).json(savedData);
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});
app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);

