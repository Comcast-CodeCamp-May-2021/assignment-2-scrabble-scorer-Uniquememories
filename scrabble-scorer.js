// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

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
	let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      // letterPoints += Number(pointValue);'\n'
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.clear();
   console.log("Let's play some Scrabble!\n");
   let userAnswer = input.question("Enter a word to score: ");
  //  console.log(oldScrabbleScore.scoringFunction(userAnswer));
  //  console.log(simpleScore.scoringFunction(userAnswer));
  //  console.log(vowelBonusScore.scoringFunction(userAnswer));
  return userAnswer;
};

const simpleScorePointStructure = {
  1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};

function simpleScore(word) {
  word = word.toUpperCase();
  let numericalScore = 0; 
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in simpleScorePointStructure) {
      if (simpleScorePointStructure[pointValue].includes(word[i])) {
        numericalScore += Number(pointValue);
      }
    }
  }
  return numericalScore;
}



const vowelBonusScoreStructure = {
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
  3: ['A', 'E', 'I', 'O', 'U']
}

function vowelBonusScore(word) {
  word = word.toUpperCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in vowelBonusScoreStructure) {
      if (vowelBonusScoreStructure[pointValue].includes(word[i])) {
        score += Number(pointValue);
      }
    }
  }
  return score;
}



function scrabbleScore(word, pointObject) {
  word = word.toLowerCase();
  // console.log(word);
  let finalPoints = 0;
  for (let i = 0; i < word.length; i++) {
	  for (let pointValue in pointObject) {
      pointValue = pointValue.toLowerCase()
		  if (pointValue.includes(word[i])) {
        finalPoints += Number(pointObject[pointValue]);
      }
    }
  }
  return finalPoints; 
}


let simple = {
    name: "Simple",
    description: "Each letter is worth 1 point.",
    scoringFunction: simpleScore
  };
let vowelBonus = {
    name: "Vowel Bonus",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction: vowelBonusScore
  };
let oldScrabble = {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoringFunction: scrabbleScore 
  };

const scoringAlgorithms = [simple, vowelBonus, oldScrabble];

// console.log(scoringAlgorithms);


function scorerPrompt() {
  let chosenAlgorithm;
  let userAnswer;
   console.log("Which scoring algorithm would you like to use? \n"); 
    while (userAnswer < 0 || userAnswer > 3 || isNaN(userAnswer)) {
     for (i in scoringAlgorithms) {
       console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
     }
     userAnswer = Number(input.question("Enter 0, 1, or 2: "));
  if (userAnswer === 0) {
    chosenAlgorithm = scoringAlgorithms[0];
  }
  else if (userAnswer === 1) {
    chosenAlgorithm = scoringAlgorithms[1];
  }
  else if (userAnswer === 2) {
    chosenAlgorithm = scoringAlgorithms[2];
  }
  return chosenAlgorithm;
  } 
}

function transform(oldVsNew) {
  let newStructure = {};

  for (let item in oldVsNew) {
    let newScore = oldVsNew[item];
      // console.log({newScore});
      for(let i = 0; i < newScore.length; i++) {
        newScore[i] = newScore[i].toLowerCase()
        newStructure[newScore[i]] = Number(item);
      }
  }
  return newStructure
}


let newPointStructure = transform(oldPointStructure);
// console.log(newPointStructure);

function runProgram() {
  let userInput = initialPrompt();
  let userScore = scorerPrompt();
  console.log(`Score for '${userInput}': ${userScore.scoringFunction(userInput)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

