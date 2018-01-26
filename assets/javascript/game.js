/*
 * For convenience:
 * ======================
 * id's for html elements
 * ======================
 * js-insert-img
 * js-hangman-word
 * js-guessess-remaining
 * js-letters-guessed
 * js-win-count
 * js-loss-count
 */

// Variables
let guessesRemaining = 10;
let winCount = 0;
let lossCount = 0;
let lettersGuessed = [];

const alphabet = [
"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

const composers = ["CHOPIN", "BACH", "BEETHOVEN"];

const composers = [
  {name: "CHOPIN",    imagePath: "./assets/images/stock-img.jpg"},
  {name: "BACH",      imagePath: "./assets/images/stock-img.jpg"},
  {name: "BEETHOVEN", imagePath: "./assets/images/stock-img.jpg"}
];