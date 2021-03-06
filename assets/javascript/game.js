/* 
 *  MODEL - directly manages the data, logic and rules of the application
 */

const hangmanWordBank = {
  _words:[
    {word: "CHOPIN",       src: "./assets/images/chopin.jpg",       alt: "Picture of Frédéric Chopin"      },
    {word: "BACH",         src: "./assets/images/bach.jpg",         alt: "Picture of Johann Sebastian Bach"},
    {word: "BEETHOVEN",    src: "./assets/images/beethoven.jpg",    alt: "Picture of Ludwig Van Beethoven" },
    {word: "RACHMANINOV",  src: "./assets/images/rachmaninov.jpg",  alt: "Picture of Sergei Rachmaninov"   },
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
    {word: "BERLIOZ",      src: "./assets/images/berlioz.jpg",      alt: "Picture of Hector Berlioz"       },
    {word: "BIZET",        src: "./assets/images/bizet.jpg",        alt: "Picture of Georges Bizet"        },
    {word: "ELGAR",        src: "./assets/images/elgar.jpg",        alt: "Picture of Edward Elgar"         },
    {word: "GERSHWIN",     src: "./assets/images/gershwin.jpg",     alt: "Picture of George Gershwin"      },
    {word: "HANDEL",       src: "./assets/images/handel.jpg",       alt: "Picture of George Handel"        },
    {word: "MAHLER",       src: "./assets/images/mahler.jpg",       alt: "Picture of Gustav Mahler"        },
    {word: "MUSSORGSKY",   src: "./assets/images/mussorgsky.jpg",   alt: "Picture of Modest Mussorgsky"    },
    {word: "ROSSINI",      src: "./assets/images/rossini.jpg",      alt: "Picture of Giachino Rossini"     },
    {word: "SCHOENBERG",   src: "./assets/images/schoenberg.jpg",   alt: "Picture of Arnold Schoenberg"    },
    {word: "SHOSTAKOVICH", src: "./assets/images/shostakovich.jpg", alt: "Picture of Dmitri Shostakovich"  },
    {word: "STRAUSS",      src: "./assets/images/strauss.jpg",      alt: "Picture of Richard Strauss"      },
    {word: "STRAVINSKY",   src: "./assets/images/stravinsky.jpg",   alt: "Picture of Igor Stravinsky"      },
    {word: "VERDI",        src: "./assets/images/verdi.jpg",        alt: "Picture of Giuseppe Verdi"       },
    {word: "VIVALDI",      src: "./assets/images/vivaldi.jpg",      alt: "Picture of Antonio Vivaldi"      },
    {word: "WAGNER",       src: "./assets/images/wagner.jpg",       alt: "Picture of Richard Wagner"       },
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
    }
  },

  userGuesses(guess) {

    // Screen out letters already guessed
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
    // Screen out letters already guessed
    if (this._lettersGuessed.indexOf(guess) === -1 &&
        this._hangmanWord.indexOf(guess)    === -1)
    {
      return true;
    }
    else return false;
  },

  guessIsCorrect(guess) {
    if (this.word.indexOf(guess) !== -1) return true;
    else return false;
  },

  updateHangmanWord(guess) {

    // Iterate over hangman word
    for (let i = 0; i < this.word.length; i++) {

      // Replace underscore with letter if guess is a match
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

    // Create game's underscores to display on webpage
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
    if (this.guessesRemaining === 0) {
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

    // DOM renders are expensive, only call updates to necessary components
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

  // Toggle switch for between rounds, disables event listener
  roundOver: false,

  controller(guess) {

    // Was user guess 1) not a repeat, and 2) correct
    if (hangmanGame.userGuesses(guess)) {

      // render DOM with updated hangman word
      DOM.render('correctGuess');

      // Test if user won the game
      if (hangmanGame.didUserWin()) {

        // Disable user input
        this.roundOver = true;

        // Render DOM with win
        DOM.render('winRound');

        // Alert user to win (after DOM has time to render)
        setTimeout( () => {
            alert("You won this round!\n\nPress ENTER to play again!");
        }, 400);

        // Set up game for next round
        setTimeout( () => {
            this.nextRound();
        }, 700);
      }
    }
    // If user guess was incorrect
    else {

      // render DOM with updated guesses, letters
      DOM.render('incorrectGuess');

      // Test if user lost game
      if (hangmanGame.didUserLose()) {

        // Disable user input
        this.roundOver = true;

        // Render update to DOM
        DOM.render('loseRound');

        // Alert user to loss (after DOM has time to render)
        setTimeout( () => {
            alert(`You lost this round!\n\nThe composer's name was: ${hangmanGame.word}\n\nPress ENTER to play again!`);
        }, 400);

        // Set up game for next round
        setTimeout( () => {
            this.nextRound();
        }, 700);
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

// Event listener
document.addEventListener('keypress', (event) => {

  // Prevents game errors when user mashes keys while between rounds
  if (!gameEngine.roundOver) {

    if (event.charCode >= 65 && event.charCode <= 90 || // A-Z or...
        event.charCode >= 97 && event.charCode <= 122)  // a-z
    {
      let guess = event.key.toUpperCase();
      gameEngine.controller(guess);
    }
  }
});

// Initialize gameProps when page loads the first time
gameEngine.nextRound();
