/* 
 *  MODEL - directly manages the data, logic and rules of the application
 */

const hangmanWordBank = {
  _words:[
    {word: "CHOPIN",       src: "./assets/images/chopin.jpg",       alt: "Picture of Frédéric Chopin"      },
    {word: "BACH",         src: "./assets/images/bach.jpg",         alt: "Picture of Johann Sebastian Bach"},
    {word: "BEETHOVEN",    src: "./assets/images/beethoven.jpg",    alt: "Picture of Ludwig Van Beethoven" },
    {word: "RACHMANINOV",  src: "./assets/images/rachmaninoff.jpg", alt: "Picture of Sergei Rachmaninov"   },
    {word: "SCHUBERT",     src: "./assets/images/schubert.jpg",     alt: "Picture of Franz Schubert"       },
    {word: "LISZT",        src: "./assets/images/liszt.jpg",        alt: "Picture of Franz Liszt"          },
    {word: "BRAHMS",       src: "./assets/images/brahms.jpg",       alt: "Picture of Johannes Brahms"      },
    {word: "MENDELSSOHN",  src: "./assets/images/mendelssohn.jpg",  alt: "Picture of Felix Mendelssohn"    },
    {word: "DEBUSSY",      src: "./assets/images/debussy.jpg",      alt: "Picture of Claude Debussy"       },
    {word: "RAVEL",        src: "./assets/images/ravel.jpg",        alt: "Picture of Maurice Ravel"        },
    {word: "TCHAIKOVSKY",  src: "./assets/images/tchaikovsky.jpg",  alt: "Picture of Pyotr Tchaikovsky"    },
    {word: "SCHUMANN",     src: "./assets/images/schumann.jpg",     alt: "Picture of Robert Schumann"      },
    {word: "HAYDN",        src: "./assets/images/haydn.jpg",        alt: "Picture of Joseph Haydn"         },
    {word: "GRIEG",        src: "./assets/images/grieg.jpg",        alt: "Picture of Edvard Grieg"         },
    {word: "MOZART",       src: "./assets/images/mozart.jpg",       alt: "Picture of Wolfgang Mozart"      }
  ],

  get word() {
    return this._words[Math.floor(Math.random() * this._words.length)];
  }
};

const hangmanGame = {
  guessesRemaining: 0,
  winCount: 0,
  lossCount: 0,
  _wordObject: {},
  _hangmanWord: [],
  _lettersGuessed: [],
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

  get word() {
    return this._wordObject.word;
  },

  get imageSrc() {
    return this._wordObject.src;
  },

  get imageAlt() {
    return this._wordObject.alt;
  },

  get hangmanWord() {
    return this._hangmanWord.join('');
  },

  get lettersGuessed() {
    return this._lettersGuessed.join(' ');
  },

  set wordObject(obj) {
    // Test for required properties of word object before setting
    if (Object.keys(obj).indexOf("alt")  !== -1 &&
        Object.keys(obj).indexOf("src")  !== -1 &&
        Object.keys(obj).indexOf("word") !== -1)
    {
      this._wordObject = obj;
      console.log(`Hangman word is: ${this.word}`);
    }
  },

  userGuesses(guess) {

    // Was user guess 1) a letter, and 2) not already guessed
    if (this.guessIsValid(guess)) {

      // If user guess was correct
      if (this.guessIsCorrect(guess)) {
        this.updateHangmanWord(guess);
        return true;
      } 
      // If user guess was incorrect
      else {
        this.addToLettersGuessed(guess);
        this.decrementGuessesRemaining();
        return false;
      }
    }
  },

  guessIsValid(guess) {
    if (this.alphabet.indexOf(guess)        !== -1 && // guess *is* in alphabet
        this._lettersGuessed.indexOf(guess) === -1 && // guess *not* in previously guessed letters
        this._hangmanWord.indexOf(guess)    === -1)   // guess *not* already in hangman letters
    {
      return true;
    }
    else
    {
      return false;
    }
  },

  guessIsCorrect(guess) {
    if (this.word.indexOf(guess) !== -1) return true;
    else return false;
  },

  updateHangmanWord(guess) {
    for (let i = 0; i < this.word.length; i++) {
      if (this.word.charAt(i) === guess) {
        this._hangmanWord[i] = guess; 
      }
    }
  },

  addToLettersGuessed(guess) {
    this._lettersGuessed.push(guess);
  },

  decrementGuessesRemaining() {
    this.guessesRemaining--;
  },

  incrementWinCount() {
    this.winCount++;
  },

  incrementLossCount() {
    this.lossCount++;
  },

  newRound() {
    this.guessesRemaining = 10;
    this._lettersGuessed = [];
    this.hangmanWordInitialState();
  },

  hangmanWordInitialState() {
    let underscoreWord = [];
    for (let i = 0; i < this.word.length; i++) {
      underscoreWord.push("_");
    }
    this._hangmanWord = underscoreWord;
  },

  didUserWin() {
    if (this.word === this.hangmanWord) {
      this.incrementWinCount();
      return true;
    }
    else return false;
  },

  didUserLose() {
    if (this.guessesRemaining <= 0) {
      this.incrementLossCount();
      return true;
    }
    else return false;
  }
};



/*
 *  View - output representation of information
 */

const DOM = {
  render(component) {

    switch (component) {

      case 'incorrectGuess':
        document.getElementById('js-letters-guessed').innerHTML = hangmanGame.lettersGuessed;
        document.getElementById('js-guesses-remaining').innerHTML = hangmanGame.guessesRemaining;
        break;

      case 'correctGuess':
        document.getElementById('js-hangman-word').innerHTML = hangmanGame.hangmanWord;
        break;

      case 'winRound':
        document.getElementById('js-letters-guessed').innerHTML = hangmanGame.lettersGuessed;
        document.getElementById('js-win-count').innerHTML = hangmanGame.winCount;
        document.getElementById('js-insert-img').src = hangmanGame.imageSrc;
        document.getElementById('js-insert-img').alt = hangmanGame.imageAlt;
        break;

      case 'loseRound':
        document.getElementById('js-letters-guessed').innerHTML = hangmanGame.lettersGuessed;
        document.getElementById('js-guesses-remaining').innerHTML = hangmanGame.guessesRemaining;
        document.getElementById('js-loss-count').innerHTML = hangmanGame.lossCount;
        document.getElementById('js-insert-img').src = hangmanGame.imageSrc;
        document.getElementById('js-insert-img').alt = hangmanGame.imageAlt;
        break;

      case 'newRound':
        document.getElementById('js-letters-guessed').innerHTML = hangmanGame.lettersGuessed;
        document.getElementById('js-hangman-word').innerHTML = hangmanGame.hangmanWord;
        document.getElementById('js-guesses-remaining').innerHTML = hangmanGame.guessesRemaining;
        document.getElementById('js-insert-img').src = "./assets/images/piano.jpg";
        document.getElementById('js-insert-img').alt = "Picture of piano";
        break;

      default:
        console.log(`DOM.render 'default' switch case: ${component} did not render`);
        break;
    }
  }
};

/*
 *  Controller - accepts input and converts it to commands for the model/view
 */

const gameEngine = {

  roundOver: false,

  controller(guess) {

    // Was user guess valid (letter of alphabet), not a repeat, and correct
    if (hangmanGame.userGuesses(guess)) {
      
      // Update DOM with updated hangman word
      DOM.render('correctGuess');

      // Test if user won the game
      if (hangmanGame.didUserWin()) {

        // Render update to DOM
        DOM.render('winRound');

        // Alert user to win (after DOM has time to render)
        setTimeout( () => {
            alert("You won this round!\n\nPress ENTER to play again!");
        }, 100);

        setTimeout( () => {
            this.nextRound();
        }, 200);
      }

    } 
    // If user guess was incorrect
    else {
      
      DOM.render('incorrectGuess');

      // Test if user lost game
      if (hangmanGame.didUserLose()) {

        this.roundOver = true;

        // Render update to DOM
        DOM.render('loseRound');

        // Alert user to loss (after DOM has time to render)
        setTimeout( () => {
            alert(`You lost this round!\n\nThe composer's name was: ${hangmanGame.word}\n\nPress ENTER to play again!`);
        }, 100);

        setTimeout( () => {
            this.nextRound();
        }, 200);

      }

    }
    
  },

  //  Get ready for new round of gameplay
  nextRound() {
    hangmanGame.wordObject = hangmanWordBank.word;
    hangmanGame.newRound();
    DOM.render('newRound');
    this.roundOver = false;
  }

};

// Initialize gameProps when page loads the first time
gameEngine.nextRound();

// Event listener
document.addEventListener('keypress', (event) => {

  // Disable user input while between rounds...
  // Prevents game errors of user just mashing keys
  if (!gameEngine.roundOver) {
    let guess = event.key.toUpperCase();
    gameEngine.controller(guess);
  }
})