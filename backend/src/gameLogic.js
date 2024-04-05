import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

// Convert the URL to a file path and then get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORDS_PATH = path.join(__dirname, 'words_alpha.txt');

async function loadWords() {
  const data = await fs.readFile(WORDS_PATH, 'utf8');
  return data.split('\n').map((word) => word.trim());
}

async function startGame(req, res) {
  const { length, allowRepeats } = req.body;
  const words = await loadWords();
  const filteredWords = words.filter((word) => word.length === length);
  // If 'allowRepeats' affects word selection, add logic here
  const selectedWord =
    filteredWords[Math.floor(Math.random() * filteredWords.length)];

  // save a word in session
  req.session.correctWord = selectedWord;
  // For now, just log if repeats are allowed and proceed as before
  console.log(`Repeats allowed: ${allowRepeats}`);
  console.log(
    `Starting game with word length ${length} and repeats allowed: ${allowRepeats}`
  );
  console.log(`Selected word: ${selectedWord}`);
  res.json({ success: true, message: 'Game started', word: selectedWord });
}

export default startGame;