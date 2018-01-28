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

  renderDOM(gamePropsComponent, elementId) {
    document.getElementById(elementId).innerHTML = gamePropsComponent;
  }
}

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