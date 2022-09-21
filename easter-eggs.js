// Loader
function Loader() {
  let interval;
  let frames = ["-", "\u005c\ ", "|", "/", "-"];
  this.i = 0;
  this.result;
  this.render = () => {
    this.i++;
    console.clear();
    if (frames.length === this.i) this.i = 0;
    console.log(frames[this.i]);
  };
  this.animate = function () {
    interval = setInterval(this.render, 300);
  };
  this.load = function (name, ...args) {
    this.animate();
    setTimeout(() => {
      clearInterval(interval);
      console.clear();
      // Antes de usar la funcion factory
      // this.result = callback(...args);
      this.snippet = this.whenAnimationComplete(name, ...args);
    }, 3000);
  };
}

// 01-Clock
function Clock() {
  const countdown = document.querySelector(".countdown");
  const hoursHtml = document.querySelector(".countdown__number-block--hours");
  const minutesHtml = document.querySelector(".countdown__number-block--minutes");
  const secondsHtml = document.querySelector(".countdown__number-block--seconds");

  countdown.classList.remove("show")
  let interval;
  let turn = "am";
  this.show = function () {
    const fechaHora = new Date();
    let hours = fechaHora.getHours();
    let minutes = fechaHora.getMinutes();
    let seconds = fechaHora.getSeconds();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (hours > 21 && hours < 24) {
      hours = hours - 12;
      turn = "pm";
    }
    if (hours > 12) {
      hours = "0" + (hours - 12);
      turn = "pm";
    }
    const date = `${hours}:${minutes}:${seconds} ${turn}`;
    hoursHtml.textContent = hours;
    minutesHtml.textContent = minutes;
    secondsHtml.textContent = seconds;

    console.clear();
    console.log(date);
  };
  this.animate = function () {
    interval = setInterval(this.show, 1000);
  };
  this.init = function () {
    this.animate();
    document.addEventListener("click", () => {
      clearInterval(interval);
      console.clear();
      countdown.classList.add("show")
      console.log("Let's keep playing!");
    });
  };
  this.init();
}

// 02-Formatter
function numberFormatter(base, suffixes) {
  return function (number) {
    if (number < base) {
      return `${number}${suffixes[0]}`;
    } else if (number < base ** 2) {
      return `${parseInt(number / base)}${suffixes[1]}`;
    } else {
      return `${parseInt(number / base ** 2)}${suffixes[2]}`;
    }
  };
}

// 03-Marquee
function marquee(text, value) {
  let position = 0;
  let i = 0;
  let interval;
  let length = value;
  let content = "";
  let symbol = text;

  this.draw = function () {
    let line = "";
    const prev = position < value ? position : value;
    const next = length - prev;
    content += symbol[i];
    if ( next === 0 ) { 
      symbol = symbol.slice(1);
      content = content.slice(1);
    }
    if (symbol.length - 1 > i) {
      line = `${" ".repeat(next)}${content}${" ".repeat(prev)}`;
      i++;
    } else {
      line = `${" ".repeat(next)}${symbol}${" ".repeat(prev)}`;
    }
    
    console.clear();
    console.log(line);

    position++;
    if (symbol.length === 0) {
      clearInterval(interval);
    }
  };
  this.animate = function () {
    interval = setInterval(this.draw, 100);
  };
  this.init = function () {
    if (text.length < value) {
      this.animate();
    }else {
      console.log("El espaciado debe ser mayor a la longitud del texto")
    }
  };
  this.init();
}

// 04-Tic Tac Toe
function TicTacToe() {
  // PRINT THE BOARD
  function drawBoard(round, board){
    console.group(`Score after round ${round}`);
    console.log("\n" + ' ' + (board["7"] || '(0, 0)') + " | " + (board["8"] || '(1, 0)') + " | " + (board["9"] || '(2, 0)') + "\n"  +
    "-----------------------" + "\n" +
    ' ' + (board["4"] || '(0, 1)') + " | " + (board["5"] || '(1, 1)') + " | " + (board["6"] || '(2, 1)') + "\n"  + 
    "-----------------------" + "\n" +
    ' ' + (board["1"] || '(0, 2)') + " | " + (board["2"] || '(1, 2)') + " | " + (board["3"] || '(2, 2)') + "\n\n");
    console.groupEnd();
  };
  
  // SOLUTIONS FOR WIN
  function solutions(board) {
    return false
    // horizontal
    || (board["7"] && (board["7"] == board["8"] && board["7"] == board["9"]))
    || (board["4"] && (board["4"] == board["5"] && board["4"] == board["6"]))
    || (board["1"] && (board["1"] == board["2"] && board["1"] == board["3"]))
    // vertical
    || (board["7"] && (board["7"] == board["4"] && board["7"] == board["1"]))
    || (board["8"] && (board["8"] == board["5"] && board["8"] == board["2"]))
    || (board["9"] && (board["9"] == board["6"] && board["9"] == board["3"]))
    // diagonal
    || (board["7"] && (board["7"] == board["5"] && board["7"] == board["3"]))
    || (board["9"] && (board["9"] == board["5"] && board["9"] == board["1"]));
  };

  // PLAYERS CONFIGS
  let defaultConfig = { 
    player1:{
        title: "Player 1",
        symbol: "×"
    },
    player2:{
        title: "Player 2",
        symbol: "○"
    }
  };
  let player1Move, board, ask, currentPlayer, opponentPlayer;
  let round = 0;
  let gameOn = true;
  let existWinner = false;
  let counter = 0
  board = {
    "7": "", //(0,0)
    "8": "", //(1,0)
    "9": "", //(2,0)
    "4": "", //(0,1)
    "5": "", //(1,1)
    "6": "", //(2,1)
    "1": "", //(0,2)
    "2": "", //(1,2)
    "3": ""  //(2,2)
  };

  function validateRound(position, symbol) {
    if (!board[position]) {
      board[position] = `  ${symbol}  `;
      round++
    }
  }
  function reset() {
    board = {
      "7": "", //(0,0)
      "8": "", //(1,0)
      "9": "", //(2,0)
      "4": "", //(0,1)
      "5": "", //(1,1)
      "6": "", //(2,1)
      "1": "", //(0,2)
      "2": "", //(1,2)
      "3": ""  //(2,2)
    };
    round = 0;
    gameOn = true;
    existWinner = false;
    counter = 0
  }

  function askConfirmation() {
    const confirmation = prompt("¿Deseas jugar de nuevo? (si/no)").toLocaleLowerCase();
    if (confirmation === "si") {
      console.clear();
      console.log("Por favor ingresa el comando : 'variable de instancia'.snippet('x', 'y')")
      reset();
    }else {
      console.clear();
    }
  }

  // GAME LOGIC
  this.game = function (x,y) {
    console.clear();
    if (gameOn && !existWinner) {
      if (round % 2 === 0) { 
        console.log("It's ⭕ turn");
        if (x === 0 && y === 2) validateRound("1", "❌");
        if (x === 1 && y === 2) validateRound("2", "❌");
        if (x === 2 && y === 2) validateRound("3", "❌");
        if (x === 0 && y === 1) validateRound("4", "❌");
        if (x === 1 && y === 1) validateRound("5", "❌");
        if (x === 2 && y === 1) validateRound("6", "❌");
        if (x === 0 && y === 0) validateRound("7", "❌");
        if (x === 1 && y === 0) validateRound("8", "❌");
        if (x === 2 && y === 0) validateRound("9", "❌");
      }
      else {
        console.log("It's ❌ turn");
        if (x === 0 && y === 2) validateRound("1", "⭕");
        if (x === 1 && y === 2) validateRound("2", "⭕");
        if (x === 2 && y === 2) validateRound("3", "⭕");
        if (x === 0 && y === 1) validateRound("4", "⭕");
        if (x === 1 && y === 1) validateRound("5", "⭕");
        if (x === 2 && y === 1) validateRound("6", "⭕");
        if (x === 0 && y === 0) validateRound("7", "⭕");
        if (x === 1 && y === 0) validateRound("8", "⭕");
        if (x === 2 && y === 0) validateRound("9", "⭕");
      }
      drawBoard(round, board);
      if (solutions(board)){
        const symbol = round % 2 !== 0 ? "❌" : "⭕"
        console.log("You win" + symbol);
        askConfirmation();
        gameOn = false;
      }
      
      if (Object.values(board).every(value => value !== "")) {
        console.log("It's a tie");
        askConfirmation();
      }
      else {
        gameOn = true;
      }
    }
  };

  this.play = function(x, y){
    this.game(x, y);
  } 

  console.log("It's ❌ turn");
  drawBoard(round, board)
}

//05-Ahorcado
function Ahorcado() {
  let arrayWords = ["JAVASCRIPT"]
  let words = arrayWords[Math.floor(Math.random() * arrayWords.length)];
  let letteres = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
  let foundLetters = [];
  let sendLetters = [];
  let showLetther = "";
  let showGuionWord = "";
  let count = 0;
  let countWords = 0;

  let body = {
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": ""
  };
  function reset() {
    countWords = 0;
    count = 0;
    showLetther = "";
    showGuionWord = "";
    foundLetters = [];
    words = arrayWords[Math.floor(Math.random() * arrayWords.length)];
    body = {
      "1": "",
      "2": "",
      "3": "",
      "4": "",
      "5": "", 
      "6": "", 
      "7": "" 
    };
  }
  this.draw =  function (body) {
    console.log(`       _______
      |      |
      |     ${body["1"] || " "}
      |     ${body["3"] || " "}${body["2"]}${body["4"] || " "}
      |      ${body["5"] || " "}
      |      ${body["6"] || " "}${body["7"]|| " "} 
      |
      |
 _____|_____\n`
    );
  }

  this.game = function (letter) {
    console.clear();
    sendLetters.push(letter); //PALABRA = 7 - 3 = 4 PALBR
    if (countWords !== words.length - words.split('').filter((c, i, a)=>a.indexOf(c) !== i).length) {
      if (words.includes(letter)) {
        if (!foundLetters.includes(letter)) {
          foundLetters.push(letter);
          countWords++;
        }
        this.draw(body);
      }else {
        count++
        body["1"] = count === 1 ? "⭕" : body["1"];
        body["2"] = count === 2 ? "|" : body["2"];
        body["3"] = count === 3 ? "-" : body["3"];
        body["4"] = count === 4 ? "-" : body["4"];
        body["5"] = count === 5 ? "|" : body["5"];
        body["6"] = count === 6 ? "/" : body["6"];
        body["7"] = count === 7 ? "\u005c\ " : body["7"];
        this.draw(body)
      }
      letteres.forEach(item => {
        if (sendLetters.includes(item)) {
          showLetther += `❌  `
        }else {
          showLetther += `${item}  `
        }
      })
      for (let i = 0; i < words.length; i++) {
        if (foundLetters.includes(words[i])) {
          showGuionWord += `${words[i]} `
        }else{
          showGuionWord += "_ "
        }
      }
      console.log(showGuionWord);
      console.log(showLetther)
      showLetther = "";
      showGuionWord = "";
  
      if (countWords === words.length - words.split('').filter((c, i, a)=>a.indexOf(c) !== i).length) {
        console.log("Ganaste :D")
        askConfirmation();
      }
      if (count === 7) {
        console.log("Perdiste :c ");
        askConfirmation();
      }
    }
  }

  function askConfirmation() {
    const confirmation = prompt("¿Deseas jugar de nuevo? (si/no)").toLocaleLowerCase();
    if (confirmation === "si") {
      console.clear();
      console.log("Por favor ingresa el comando : 'variable de instancia'.game('letra')")
      reset();
    }
  }
  this.play = function(letter){
    this.game(letter.toUperCase());
  }
  this.draw(body);
  letteres.forEach(item => {
    showLetther += `${item}  `
  })
  for (let i = 0; i < words.length; i++) {
    showGuionWord += "_ "
  }
  console.log(" "+showGuionWord)
  console.log(showLetther)
  showGuionWord = ""
  showLetther = ""
}
// EasterEgg Pattern
function EasterEgg(name, ...args) {
  const loader = new Loader();
  loader.whenAnimationComplete = function (name, ...args) {
    switch (name) {
      case "clock":
        return new Clock();
      case "number formatter":
        return numberFormatter(...args);
      case "marquee":
        return marquee(...args);
      case "tic tac toe":
        return new TicTacToe();
      case "ahorcado":
        return new Ahorcado();
      default:
        console.log("No contemplado");
    }
  };
  loader.load(name, ...args);
  return loader;
}
