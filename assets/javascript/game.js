/*
MVC Framework:

Model: (Classes used to store and manipulate state)
  gameProps Object (game variables)
  composerList Object (game word bank)

View: (The user interface necessary to render the model to the user)
  renderDOM object (updates DOM)

Controller: (The brains of the application)
  gameEngine object ('runs the show')

*/


const hangmanWords = {
  _wordBank:[
    {word: "CHOPIN",       src: "./assets/images/stock-img.jpg", alt: "Picture of Frédéric Chopin"},
    {word: "BACH",         src: "./assets/images/stock-img.jpg", alt: "Picture of Johann Sebastian Bach"},
    {word: "BEETHOVEN",    src: "./assets/images/stock-img.jpg", alt: "Picture of Ludwig Van Beethoven"},
    {word: "RACHMANINOFF", src: "./assets/images/stock-img.jpg", alt: "Picture of Sergei Rachmaninoff"},
    {word: "MOZART",       src: "./assets/images/stock-img.jpg", alt: "Picture of Wolfgang Mozart"}
  ],

  set composers(wordObject) {
    if (/* Test for object with 3 required properties */) {
      this._wordBank.push(wordObject);
    }
  },

  get composers() {
    return this._composers[Math.floor(Math.random() * this._composers.length];
  }
};



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

  set lettersGuessed(userGuess) {
    userGuess = userGuess.toUpperCase();
    if (this._alphabet.indexOf(userGuess) !== -1 && 
        this._lettersGuessed.indexOf(userGuess) === -1) {
      this._lettersGuessed.push(userGuess);
      this.decrementGuessesRemaining();
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

  get alphabet() {
    return this._alphabet;
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
  },

  isLetterMatch(guess) {
    if (guess) {
      return true;
    } else {
      return false;
    }
  },

  renderDOM(component) {
    if (component === "lettersGuessed")
      document.getElementById('js-letters-guessed').innerHTML = gameProps.lettersGuessed;

    if (component === "guessesRemaining")
      document.getElementById('js-guesses-remaining').innerHTML = gameProps.guessesRemaining;

    if (component === "word")
      // document.getElementById('js-hangman-word').innerHTML = gameProps.;

    if (component === "winCount")
      document.getElementById('js-win-count').innerHTML = gameProps.winCount;

    if (component === "lossCount")
      document.getElementById('js-loss-count').innerHTML = gameProps.lossCount;

    if (component === "image")
      document.getElementById('js-insert-img').src = gameProps.imageSrc;
      document.getElementById('js-insert-img').alt = gameProps.imageAlt;
  }
};

gameProps.newRoundGameProps();
gameProps.secretWordObject();

// Listen for keypress events
document.addEventListener('keypress', (event) => {

  let guess = event.key;

  gameProps.lettersGuessed = guess;

  gameProps.renderDOM(gameProps.lettersGuessed, 'js-letters-guessed');
  gameProps.renderDOM(gameProps.guessesRemaining, 'js-guesses-remaining');

  // Test if game is over
  if (gameProps.guessesRemaining === 0) {
    alert(`You lost this round! The correct word was: ${gameProps.secretWord}`);
    gameProps.newRoundGameProps();
    gameProps.renderDOM(gameProps.lettersGuessed, 'js-letters-guessed');
    gameProps.renderDOM(gameProps.guessesRemaining, 'js-guesses-remaining');
  }
});