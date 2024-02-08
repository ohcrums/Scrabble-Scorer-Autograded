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
      word = input.question ( "Let's play some scrabble! \nEnter a word to score: " );
  }
   // call to function with user word, print result
   // console.log( vowelBonusScorer(word) );
   return word;
};

let simpleScorer = function (word) { 
   // declare output variable
   let letterPoints = 0;

   // loop for word length
   for (let i = 0; i < word.length; i++) {
      // add 1 to letterpoints for each loop, 1 per letter
      letterPoints ++; 

      // no longer using
      // console.log ( `Simple scores 1 point for '${word[i]}'` );
   }
   // this was used earlier and is now handled elsewhere
   // console.log ( `\nTotal Simple Score: ${letterPoints} for ${word}` );
   return letterPoints;
};

function vowelBonusScorer(word) {
   // declare output, and some variables for counting score totals
	let letterPoints = "";
   let conScore = 0;
   let vowScore = 0;
   // local scoring array
   let scorerArr = {
      1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
      3: [ 'A', 'E', 'I', 'O', 'U']
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
               // letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            } else if (pointValue === '3') {
               vowScore += Number(pointValue);
               // letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            }
         }
	   }
	}
   // sum the two score values 
   let totalScore = conScore + vowScore;
   // concat the template literals
   console.log(totalScore);
	return totalScore;
 }

let scrabbleScorer;

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: oldScrabbleScorer
   }
];

function scorerPrompt() {
  let algoChoice;
  while ( algoChoice > 2 || algoChoice < 0 || isNaN(algoChoice) ) {
    algoChoice = Number( input.question("\nWhich scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ") );
  }
  return algoChoice
}

function transform() {};

let newPointStructure = {
   // must remember .toUpperCase() always.
   A: ['1'],
   B: ['3'],
   C: ['3'],
   D: ['2'],
   E: ['1'],
   F: ['4'],
   G: ['2'],
   H: ['4'],
   I: ['1'],
   J: ['8'],
   K: ['5'],
   L: ['1'],
   M: ['3'],
   N: ['1'],
   O: ['1'],
   P: ['3'],
   Q: ['10'],
   R: ['1'],
   S: ['1'],
   T: ['1'],
   U: ['1'],
   V: ['4'],
   W: ['4'],
   X: ['8'],
   Y: ['4'],
   Z: ['10']
};

function runProgram() {
   // call function to variable
   let word = initialPrompt();
   // call algorithm choice function
   let algoChoice = scorerPrompt();
   
   // state algo choice from object with dot notation
   console.log( "\nAlgorithm choice: ", scoringAlgorithms[Number(algoChoice)].name );
   // print score by calling to function with object dot notation
   // also make case insensitive for all algos
   console.log( `Score for '${word}': `, scoringAlgorithms[Number(algoChoice)].scorerFunction(word.toUpperCase()) );
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
