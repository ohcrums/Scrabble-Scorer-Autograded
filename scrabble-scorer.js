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
	word = word.toLowerCase();
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
   }
   return letterPoints;
};

function vowelBonusScorer(word) {
   // declare output, and some variables for counting score totals
   let conScore = 0;
   let vowScore = 0;
   // local scoring array
   let scorerArr = {
      1: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'],
      3: [ 'a', 'e', 'i', 'o', 'u']
   };
   
   // loop for word length
	for (let i = 0; i < word.length; i++) {
      for (const pointValue in scorerArr) {

		   if (scorerArr[pointValue].includes(word[i])) {

            if (pointValue === '1') {
               conScore += Number(pointValue);

            } else if (pointValue === '3') {
               vowScore += Number(pointValue);
            }
         }
	   }
	}
   // sum the two score values 
   let totalScore = conScore + vowScore;
   // console.log(typeof totalScore, totalScore);
	return totalScore;
 }

let scrabbleScorer = function(word) {
	let letterPoints = "";
   let score = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const letterKey in newPointStructure) {
 
		 if (letterKey.includes(word[i])) {
			score = Number(score) + Number(newPointStructure[letterKey]) 
		 }
	  }
	}
	return score;
};

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
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
  let algoChoice;
  while ( algoChoice > 2 || algoChoice < 0 || isNaN(algoChoice) ) {
    algoChoice = Number( input.question("\nWhich scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ") );
  }
  return algoChoice
}


function transform(oldPointStructure) {
   let newPointStructure = {};

   // loop once for each key in og object
      for (let key in oldPointStructure) {
         let letters = oldPointStructure[key];

         let newKey = '';

         // loop once for each entry in the array of the current key
         for (i = 0; i < letters.length; i++) {
            // console.log (typeof letters[i], letters[i])

            newKey = letters[i]
            newKey = newKey.toLowerCase()
            newPointStructure[newKey] = Number(key);
         }
      }
   
   // console.log(newPointStructure)
   return newPointStructure;
};
// transform; // for testing


let newPointStructure = transform(oldPointStructure);
   

function runProgram() {
   // call function to variable
   let word = initialPrompt();
   // call algorithm choice function
   let algoChoice = scorerPrompt();

   let algoName = scoringAlgorithms[Number(algoChoice)].name;
   let scoreWord = scoringAlgorithms[Number(algoChoice)].scorerFunction(word.toLowerCase());

   // state algo choice from object with dot notation
   console.log( "\nAlgorithm choice: ", algoName );
   // print score by calling to function with object dot notation
   // also make case insensitive for all algos
   console.log( `Score for '${word}': `, scoreWord );
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

