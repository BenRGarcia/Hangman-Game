/*
 * MVC Framework:
 * View: (The user interface necessary to render the model to the user)
 *   renderDOM object (updates DOM)
 * Controller: (The brains of the application)
 *   gameEngine object ('runs the show')
*/

/* 
 *  MODEL - directly manages the data, logic and rules of the application
 */

// Word Bank
const hangmanWords = {
  _wordBank:[
    {word: "CHOPIN",       src: "./assets/images/chopin.jpg",       alt: "Picture of Frédéric Chopin"      },
    {word: "BACH",         src: "./assets/images/bach.jpg",         alt: "Picture of Johann Sebastian Bach"},
    {word: "BEETHOVEN",    src: "./assets/images/beethoven.jpg",    alt: "Picture of Ludwig Van Beethoven" },
    {word: "RACHMANINOFF", src: "./assets/images/rachmaninoff.jpg", alt: "Picture of Sergei Rachmaninoff"  },
    {word: "SHUBERT",      src: "./assets/images/shubert.jpg",      alt: "Picture of Franz Shubert"        },
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

  get wordBank() {
    return this._wordBank[Math.floor(Math.random() * this._wordBank.length)];
  }
};

const gameProps = {
  _guessesRemaining: 0,
  _winCount: 0,
  _lossCount: 0,
  _lettersGuessed: [],
  _wordBankObject: {},
  _underscoreWord: "",
  _alphabet: [
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
  ],

  set lettersGuessed(userGuess) {
    userGuess = userGuess.toUpperCase();
    if (this._alphabet.indexOf(userGuess) !== -1 && 
        this._lettersGuessed.indexOf(userGuess) === -1) 
    {
      this._lettersGuessed.push(userGuess);
      this.decrementGuessesRemaining();
    }
  },

  guessHandler(guess) {
    let word = this.wordBank.word;
    let j = word.length;
    for (let i = 0; i < j; i++) {
      if (guess === word[i]) {
        this._underscoreWord[i] = guess;
      }
    }
  },

  set wordBankObject(obj) {
    this._wordBankObject = obj;
  },

  set underscoreWord(hangmanWordObj) {
    let j = hangmanWordObj.word.length;
    let underscoreWord = "";
    for (let i = 0; i < j; i++) {
      underscoreWord += "_";
    }
    this._underscoreWord = underscoreWord;
  },

  get underscoreWord() {
    return this._underscoreWord;
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

  get wordBankWord() {
    return this._wordBankObject.word;
  },

  get alphabet() {
    return this._alphabet;
  },

  get imageSrc() {
    return this._wordBankObject.src;
  },

  get imageAlt() {
    return this._wordBankObject.alt;
  },

  isGuessValid(guess) {
    if (this._alphabet.indexOf(guess) !== -1 && 
        this._lettersGuessed.indexOf(guess) === -1) 
    {
      return true;
    } 
    else 
    {
      return false;
    }
  },

  isGuessRight(guess) {
    let hangmanWord = this.wordBankWord;
    if (hangmanWord.indexOf(guess) !== -1) {
      return true;
    } else {
      return false;
    }
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

  newRoundGameProps() {
    this._guessesRemaining = 10;
    this._lettersGuessed = [];
    this._underscoreWord = ""; // <-- superfluous?
    this._wordBankObject = {}; // <-- superfluous?
  }
};



/*
 *  View - output representation of information
 */

const DOM = {
  render(component) {

    switch (component) {

      case 'lettersGuessed':
        document.getElementById('js-letters-guessed').innerHTML = gameProps.lettersGuessed;
        break;

      case 'guessesRemaining':
        document.getElementById('js-guesses-remaining').innerHTML = gameProps.guessesRemaining;
        break;

      case 'underscoreWord':
        document.getElementById('js-hangman-word').innerHTML = gameProps.underscoreWord;
        break;

      case 'winCount':
        document.getElementById('js-win-count').innerHTML = gameProps.winCount;
        break;

      case 'lossCount':
        document.getElementById('js-loss-count').innerHTML = gameProps.lossCount;
        break;

      case 'image':
        document.getElementById('js-insert-img').src = gameProps.imageSrc;
        document.getElementById('js-insert-img').alt = gameProps.imageAlt;
        break;

      case 'newRound':
        document.getElementById('js-letters-guessed').innerHTML = gameProps.lettersGuessed;
        document.getElementById('js-hangman-word').innerHTML = gameProps.underscoreWord;
        document.getElementById('js-guesses-remaining').innerHTML = gameProps.guessesRemaining;
        document.getElementById('js-win-count').innerHTML = gameProps.winCount;
        document.getElementById('js-loss-count').innerHTML = gameProps.lossCount;
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

//    gameEngine's purpose:
// 1) interaction with game props object
// 2) interaction with hangman word bank
// 3) interaction with rendering

const gameEngine = {

  controller(guess) {

    // Test for being a letter of alphabet, not already guessed
    if (gameProps.isGuessValid(guess)) {

      // Test for if letter guessed is right
      if (gameProps.isGuessRight(guess)) {
        // replace index/indices of underscore word, render updated underscore word

      } else {
        // add letter guessed to lettersGuessed array
        // decrement guessesRemaining
        // render updated guessesRemaining # and lettersGuessed array
      }
    }

    // test for win
    if (false/* underscore word = hangman word */) {
      // alert user of won game
      // increment win game
      // render image src/alt to page, queue music/sound
    }

    // Test for loss/game over
    if (false/* guesses remaining = 0 */) {
      // alert user of lost game
      // increment loss count
      // call this.newRound();
      // 
    }



    gameProps.lettersGuessed = guess;
    let secretWordObj = hangmanWords.wordBank;
    gameProps.underscoreWord = secretWordObj;
    if (false) {

    }
  },

  // Setup gameProps to be ready for new round of gameplay
  newRound() {
    gameProps.newRoundGameProps();       // guessesRemaining = 10, lettersGuessed = []
    let wordObj = hangmanWords.wordBank; // generate new hangman word
    gameProps.wordBankObject = wordObj;  // add new hangman word to gameProps
    gameProps.underscoreWord = wordObj;  // set underscore word
    DOM.render('newRound');              // render gameProps to DOM
  }
};

 /*
  * step 1 - when page first loads: get new hangman word, pass hangman word to gameprops,
  *          render underscore word to DOM
  * 
  * step 2 - listen for keypress events
  * 
  * step 3 - when keypress received, a) if it's a letter b) not previously guessed
  *          check if in hangman word. If not in hangman word, add to guessed list. 
  *          if it is in hangman word, update indices of underscore word re-render it.
  *          Then decrement guesses remaining.
  * 
  * step ? - if hangman word not guessed yet and guessesRemaining = 0, alert of lost game,
  *          increment loss count, reset gameProps: lettersGuessed = [], new hangman word,
  *          guesses remaining = 10
  * 
  * step ? - if underscore word = hangman word, alert of won game, increment win count,
  *          reset gameProps: lettersGuessed = [], new hangman word, guesses remaining = 10
  * 
  * step ? - if 
  */

/*====================================================================================*/

// Initialize gameProps when page loads the first time
gameEngine.newRound();

// Event listener
document.addEventListener('keypress', (event) => {
  let guess = event.key;
  gameEngine.controller(guess);
});