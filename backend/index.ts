import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import session from 'express-session';
import startGame from './src/gameLogic';
import generateFeedback from './src/feedbackLogic';
//--------för mongoDB----------------
import mongoose from 'mongoose';
import { Highscore } from './src/models';
import path from 'path';
// mongoose.connect(process.env.DB_URL);

mongoose.connect('mongodb+srv://masakishiraishi83:BUq2200tgGMONUOn@cluster0.1myropf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
//-------------------------------
// TypeScript
declare module "express-session"{
  interface SessionData{
    correctWord?: string;
  }
}
// const path = require('path');
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

// app.get('/', async (req, res) => {
//   const html = await fs.readFile('../tsfrontend/dist/index.html');
//   res.type('html').send(html);
// });
app.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../tsfrontend/dist/index.html');
    console.log('Trying to load:', filePath); 
    const html = await fs.readFile(filePath, 'utf8');
    res.send(html);
  } catch (error) {
    console.error('File read error:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use('/assets', express.static(path.join(__dirname, '../tsfrontend/dist/assets')));

app.get('/highscore', async(req, res) => {
  //--------för mongoDB----------
  const highscores = await Highscore.find();
  res.json({ highscores });
});

// Use the function in the route handler
// start game and setting
app.post('/start-game', startGame);

app.post('/guess', (req, res) => {
  const guess = req.body.guess.toUpperCase();
  
  if (typeof req.session.correctWord === 'undefined') {
    return res.status(400).json({ success: false, message: 'Word not found' });
  }  

  const correctWord = req.session.correctWord.toUpperCase();  
  console.log(`Selected word: ${correctWord}`);
  const { feedback, isCorrect } = generateFeedback(guess, correctWord);
  
  res.json({ success: true, feedback: feedback, isCorrect: isCorrect });
});

app.post('/highscore', async(req, res) => {
  try {
    //  with const highscoreData = req.body
    //  expected : Saved data: { _id: new ObjectId('66112ec9674e7c3eca95248e'), __v: 0 }
    const highscoreData = req.body.highscore;
    const highscoreModel = new Highscore(highscoreData);
    await highscoreModel.save();
    //  setting unik-id to every highscore datas
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

