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

  get wordBankObject() {
    return this._wordBankObject.name;
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
  },

  guessHandler(guess) {
    let word = this._wordBankObject.word;
    let j = word.length;
    for (let i = 0; i < j; i++) {
      if (guess === word[i]) {
        this._underscoreWord[i] = guess;
      }
    }
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

  // interaction with game props object
      // 



  // interaction with hangman word bank



  // interaction with rendering



  controller(guess) {
    gameProps.lettersGuessed = guess;
    let secretWordObj = hangmanWords.wordBank;
    gameProps.underscoreWord = secretWordObj;
    if () {

    }
  },

  generateHangmanWord() {
    let wordObj = hangmanWords.wordBank;
    return wordObj;
  }
};






// Initialize game when page loads the first time

// Event listener
document.addEventListener('keypress', (event) => {
  let guess = event.key;
  gameEngine.controller(guess);
});