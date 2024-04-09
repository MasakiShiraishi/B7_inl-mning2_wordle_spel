function generateFeedback(guess, correctWord) {
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
    } else if (remainingLetters.includes(guess[i])) {
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
  return{ feedback, isCorrect};
}

export default generateFeedback;