// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

// Write an initialPrompt() function that asks a user to input a word.
// Have the program return a score for the word using oldScrabbleScorer().
// Add additional scoring algorithms and store them in the scoringAlgorithms array.
// Create a transform() function that takes in the oldPointStructure object and returns a newPointStructure object.
// Use the runProgram() function to serve as the starting point for your program.

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   // declare word 
  let word = '';
  // make sure word is not a number. will think about how to prevent symbols and whitespace later.
  while ( (word === '') || !isNaN(word) ){
      word = input.question ( "Let's play some scrabble! Enter a word:" );
  }
   // call to function with user word, print result
   console.log( vowelBonusScorer(word) );
};

let simpleScorer = function (word) { 
   // case insensitive
   word = word.toUpperCase();
   // declare output variable
   let letterPoints = 0;

   // loop for word length
   for (let i = 0; i < word.length; i++) {
      // add 1 to letterpoints for each loop, 1 per letter
      letterPoints ++; 
      console.log ( `Simple scores 1 point for '${word[i]}'` );
   }
   console.log ( `\nTotal Simple Score: ${letterPoints} for ${word}` );
   return letterPoints;
};

function vowelBonusScorer(word) {
	word = word.toUpperCase();
   // declare output, and some variables for counting score totals
	let letterPoints = "";
   let conScore = 0;
   let vowScore = 0;
   // local scoring array
   let scorerArr = {
      1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
      3: [ 'A', 'E', 'I', 'O', 'U', 'Y'],
   };
   // loop for word length
	for (let i = 0; i < word.length; i++) {
      // for...in loop. for each entry in the array, where pointValue is a string, either '1' or '3'
	  for (const pointValue in scorerArr) {
      // if scorerArr[1] or if scorerArr[3] includes letter at word index (word[i]). 
      // this deals with bad inputs for now. later, may add while loop to input to require string. 
		   if (scorerArr[pointValue].includes(word[i])) {
            // if the letter found is in subarray 1, add pointValue to the relavant subScore used later
            if (pointValue === '1') {
               conScore += Number(pointValue);
               letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            } else if (pointValue === '3') {
               vowScore += Number(pointValue);
               letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            }
         }
	   }
	}
   // sum the two score values 
   let totalScore = `Total Vowel Bonus Score: ${conScore + vowScore}`;
   // concat the template literals
   letterPoints += totalScore
	return letterPoints;
 }

let scrabbleScorer;

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point',
      scoringFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scoringFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scoringFunction: oldScrabbleScorer
   }
];

function scorerPrompt() {}

function transform() {};

let newPointStructure;

function runProgram() {
   initialPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
