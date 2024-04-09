import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import session from 'express-session';
import startGame from './src/gameLogic.js';
import generateFeedback from './src/feedbackLogic.js';
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
// app.post('/start-game', async(req, res) => {
//   const { length, allowRepeats } =req.body;
//   const selectedWord = await startGame(length, allowRepeats);
//    // save a word in session
//    req.session.correctWord = selectedWord;
//   res.json({ success: true, message: 'Game started', word: selectedWord });
// });

// app.post('/start-game', async(req, res) => {
//   const { length, allowRepeats } = req.body;
//   try {
//     const selectedWord = await startGame(length, allowRepeats);
//     // Now, here you can access `req.session` and set `correctWord`
//     req.session.correctWord = selectedWord;
    
//     console.log(`Repeats allowed: ${allowRepeats}`);
//     console.log(`Starting game with word length ${length} and repeats allowed: ${allowRepeats}`);
//     console.log(`Selected word: ${selectedWord}`);
//     res.json({ success: true, message: 'Game started', word: selectedWord });
//   } catch (error) {
//     console.error('Failed to start the game:', error);
//     res.status(500).json({ success: false, message: 'An error occurred while starting the game.' });
//   }
// });
//   const selectedWord = await startGame(length, allowRepeats);
//   // save a word in session
//   req.session.correctWord = selectedWord;
//    // For now, just log if repeats are allowed and proceed as before
//    console.log(`Repeats allowed: ${allowRepeats}`);
//    console.log(
//      `Starting game with word length ${length} and repeats allowed: ${allowRepeats}`
//    );
//    console.log(`Selected word: ${selectedWord}`);
//    res.json({ success: true, message: 'Game started', word: selectedWord });
// });

app.post('/guess', (req, res) => {
  const guess = req.body.guess.toUpperCase();
  const correctWord = req.session.correctWord.toUpperCase();
  
  console.log(`Selected word: ${correctWord}`);
  if (typeof correctWord === 'undefined') {
    return res.status(400).json({ success: false, message: 'Word not found' });
  }  
  const { feedback, isCorrect } = generateFeedback(guess, correctWord);
  
  res.json({ success: true, feedback: feedback, isCorrect: isCorrect });
});

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

