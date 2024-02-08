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
   // ask for word input
   const word = ( input.question ("Let's play some scrabble! Enter a word:") );
   // call to function with user word, print result
   console.log( vowelBonusScorer(word) );
};

let simpleScorer = function (word) { 
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      letterPoints ++; 
      console.log ( `Simple scores 1 point for '${word[i]}'` );
   }
   console.log ( `\nTotal Simple Score: ${letterPoints} for ${word}` );
   return letterPoints;
};

let vowelBonusScorer1 = function (word) {
   // case insensitive
   word = word.toUpperCase();
   let letterPoints = 0;
   // declare local score array
   let scorerArr = {
      1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
      3: [ 'A', 'E', 'I', 'O', 'U', 'Y'],
   };
   // break it down
   letters = word.split('');
   let conScore = 0;
   let vowScore = 0;

   // loop for length of word
   for ( let i = 0; i < word.length; i++ ) {
      for ( pointValue in scorerArr[1] ) {
         if ( scorerArr[1][pointValue] === letters[i]) {
            console.log ( ` letter ${letters[i]} is worth ${pointValue}`)
            vowScore += 3
            console.log(vowScore)
         } else {
            console.log ( ` letter ${letters[i]} is worth ${pointValue}`)

            conScore += 1
            console.log(conScore)
         }
         // if ( scorerArr[pointValue].includes(letters[i]) ) {
         // }
      }
   }
   letterPoints = vowScore + conScore
   return letterPoints  
}

function vowelBonusScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let conScore = 0;
   let vowScore = 0;
   let scorerArr = {
      1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
      3: [ 'A', 'E', 'I', 'O', 'U', 'Y'],
   };

	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in scorerArr) {
 
		 if (scorerArr[pointValue].includes(word[i])) {
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
	return letterPoints;
 }


let scrabbleScorer;

const scoringAlgorithms = [];

function scorerPrompt() {}

function transform() {};

let newPointStructure = {
   1: ['B', 'C', 'D', 'F', '',],
   // 2: [],
   3: [ 'A', 'E', 'I', 'O', 'U', 'Y'],
   // 4: [],
   // 5: [],
   // 8: [],
   // 10: []
 };

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
