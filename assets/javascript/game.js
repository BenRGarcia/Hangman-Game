

// Game properties -- getters, setters, and methods (Oh My!)
const gameProps = {
  _guessesRemaining: 0,
  _winCount: 0,
  _lossCount: 0,
  _lettersGuessed: [],
  _secretWordObject: {},
  _alphabet: [
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
  ],
  _composers: [
    {name: "CHOPIN",       src: "./assets/images/stock-img.jpg", alt: "Picture of Frédéric Chopin"},
    {name: "BACH",         src: "./assets/images/stock-img.jpg", alt: "Picture of Johann Sebastian Bach"},
    {name: "BEETHOVEN",    src: "./assets/images/stock-img.jpg", alt: "Picture of Ludwig Van Beethoven"},
    {name: "RACHMANINOFF", src: "./assets/images/stock-img.jpg", alt: "Picture of Sergei Rachmaninoff"},
    {name: "MOZART",       src: "./assets/images/stock-img.jpg", alt: "Picture of Wolfgang Mozart"}
  ],

  set lettersGuessed(userGuess) {
    userGuess = userGuess.toUpperCase();
    if (this._alphabet.indexOf(userGuess) !== -1 && 
        this._lettersGuessed.indexOf(userGuess) === -1) {
      this._lettersGuessed.push(userGuess);
    } 
  },

  get guessesRemaining() {
    return this._guessesRemaining;
  },

  get winCount() {
    return this._winCount;
  },

  get lossCount() {
    return this._lossCount;
  },

  get lettersGuessed() {
    return this._lettersGuessed;
  },

  get secretWord() {
    return this._secretWordObject.name;
  },

  get imageSrc() {
    return this._secretWordObject.src;
  },

  get imageAlt() {
    return this._secretWordObject.alt;
  },

  decrementGuessesRemaining() {
    this._guessesRemaining--;
  },

  incrementWinCount() {
    this._winCount++;
  },

  incrementLossCount() {
    this._lossCount++;
  },

  secretWordObject() {
    this._secretWordObject = this._composers[Math.floor(Math.random() * this._composers.length)];
  },

  newRoundGameProps() {
    this._guessesRemaining = 10;
    this._lettersGuessed = [];
  }
}

// Listen for keypress events
document.addEventListener('keypress', (event) => {

  let guess = event.key;

  gameProps.lettersGuessed = guess;

});

// Render props to DOM
let hangmanDOM = {
  render(gamePropsComponent, elementId) {
    document.getElementById(elementId).innerHTML = gamePropsComponent;
  }
}

gameProps.secretWordObject();

/*
 * example 'render' function call: 
 * hangmanDOM.render(
 *   gameProps.winCount,
 *   js-win-count
 * );
 *
 * document.getElementById('js-insert-img').innerHTML = gameProps.imageSrc;
 * document.getElementById('js-hangman-word').innerHTML = gameProps.secretWord;
 * document.getElementById('js-guessess-remaining').innerHTML = gameProps.guessesRemaining;
 * document.getElementById('js-letters-guessed').innerHTML = gameProps.lettersGuessed;
 * document.getElementById('js-win-count').innerHTML = gameProps.winCount;
 * document.getElementById('js-loss-count').innerHTML = gameProps.lossCount;
*/