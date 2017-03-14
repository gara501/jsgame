/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = apiCharacters;
// Using Module Pattern


var Characters = function (options) {
  var player = function (options) {
    this.health = 100;
    this.attack = options.attack || 10;
    this.defense = options.defense || 10;
    this.name = options.name || 'Jhon Doe';
    this.playerType = options.playerType || 'hero';
    this.level = options.level || 1;
    this.avatar = options.avatar || '';

    this.decreaseHealth = function (hit) {
      if (this.health > 0) {
        this.health -= hit;
      }
      if (this.health <= 0) {
        this.health = 0;
      }
    };

    this.powerUp = function (power) {
      this.attack += power;
    };

    this.powerUpDefense = function (power) {
      this.defense += power;
    };

    this.restart = function () {
      this.health = 100;
      this.attack = 10;
      this.defense = 10;
    };
  };

  function createPlayer(options) {
    return new player(options);
  }

  function createBoss(options) {
    var Boss = new player(options);
    Boss.level = options.level;
    return Boss;
  }

  return {
    createPlayer: createPlayer,
    createBoss: createBoss
  };
}();

function apiCharacters() {
  return Characters;
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__characters_js__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = apiGame;
// Using Module Pattern




var Game = function (options) {
  var apiChar = new __WEBPACK_IMPORTED_MODULE_0__characters_js__["a" /* apiCharacters */]();

  function hitEnemy(options) {
    var sender = options.sender;
    var receiver = options.receiver;
    options.receiver.decreaseHealth(options.hit);
    return true;
  };

  function restart(options) {
    options.player1.restart();
    options.player2.restart();
    return;
  }

  function createPlayer(playerData) {
    var hero = apiChar.createPlayer(playerData);
    return hero;
  }

  function powerUp(options) {
    var player = options.player;
    player.powerUp(options.power);
    return;
  };

  return {
    createPlayer: createPlayer,
    hitEnemy: hitEnemy,
    powerUp: powerUp,
    restart: restart
  };
}();

function apiGame() {
  return Game;
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__characters_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screen_js__ = __webpack_require__(3);
/*jshint esversion: 6 */





var api = new __WEBPACK_IMPORTED_MODULE_1__characters_js__["a" /* apiCharacters */]();
var ryu = api.createPlayer({
    name: 'Ryu',
    playerType: 'hero',
    attack: 30,
    defense: 50
});

var ken = api.createPlayer({
    name: 'Ken',
    playerType: 'hero',
    attack: 20,
    defense: 10
});

var akuma = api.createBoss({
    name: 'akuma',
    playerType: 'boss',
    attack: 50,
    defense: 50,
    level: 3
});
console.log('HEROE', ryu);
console.log('HEROE 2', ken);
console.log('villano', akuma);

var newGame = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* apiGame */]();
newGame.hitEnemy({ sender: ryu, receiver: akuma, hit: ryu.attack });

console.log('HEROE', ryu);
console.log('HEROE 2', ken);
console.log('villano', akuma);

newGame.hitEnemy({ sender: ryu, receiver: akuma, hit: ryu.attack });
console.log('villano', akuma);

newGame.powerUp({ player: ryu, power: 30 });
console.log('ryu', ryu);

newGame.hitEnemy({ sender: ryu, receiver: akuma, hit: ryu.attack });
console.log('villano', akuma);

newGame.restart({ player1: ryu, player2: akuma });

console.log('HEROE', ryu);
console.log('HEROE 2', ken);
console.log('villano', akuma);

var soundIntro = new Audio('assets/music/intro.mp3');
//soundIntro.play();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_js__ = __webpack_require__(1);
/* unused harmony export apiScreen */





var Screen = function (options) {
  var introPanel = document.querySelector('.intro');
  var scenarioPanel = document.querySelector('.scenario');
  var wrapperPanel = document.querySelector('.wrapper');
  var introLevelPanel = document.querySelector('.introlevel');
  var cardSelectionPanel = document.querySelector('.card-selection');
  var consolePanel = document.querySelector('.console');
  var gameOverPanel = document.querySelector('.gameover');
  var winPanel = document.querySelector('.win');
  var battlefieldPanel = document.querySelector('.battlefield');
  var introButton = introPanel.getElementsByTagName('button');
  var selectedHeroDom = document.getElementById('selectedHero');
  var selectedEnemyDom = document.getElementById('currentEnemy');
  var heroBar = selectedHeroDom.querySelector('.hurt');
  var enemyBar = selectedEnemyDom.querySelector('.hurt');
  var currentPlayer = null;
  var currentEnemy = null;
  var currentQuestion = 0;
  var currentLevel = 1;
  var gameApi = new __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* apiGame */]();

  // Questions Arrays

  var level1q = [];
  var level2q = [];
  var level3q = [];
  var levels = {
    level1: {
      index: 'level1',
      title: 'Level 1',
      intro: 'Level 1 starting, get ready!',
      data: level1q
    },
    level2: {
      index: 'level2',
      title: 'Level 2',
      intro: 'Level 2 starting, get ready!',
      data: level2q
    },
    level3: {
      index: 'level3',
      title: 'Level 3',
      intro: 'Level 3 starting, get ready!',
      data: level3q
    }
  };

  // Music and Sounds
  var soundIntro = new Audio('assets/music/intro.mp3');
  var soundHit = new Audio('assets/music/hit2.wav');
  var soundWin = new Audio('assets/music/level1.mp3');
  var soundGameOver = new Audio('assets/music/gameover.mp3');
  var soundButton = new Audio('assets/music/button.wav');
  var soundWarrior1 = new Audio('assets/music/w1.wav');
  var soundWarrior2 = new Audio('assets/music/w2.wav');
  var soundWarrior3 = new Audio('assets/music/w3.wav');
  var soundGame = new Audio('assets/music/game.mp3');

  addListeners();
  cardListeners();
  init();

  function init() {
    sound({ start: true }, soundIntro);
    loadQuestions();
  }

  function loadQuestions() {
    var questions = Object.keys(__WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json___default.a).forEach(function (key) {
      Object.keys(__WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json___default.a[key]).forEach(function (key2) {
        if (__WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json___default.a[key][key2].level == '1') {
          level1q.push(__WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json___default.a[key][key2]);
        }
        if (__WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json___default.a[key][key2].level == '2') {
          level2q.push(__WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json___default.a[key][key2]);
        }
        if (__WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json___default.a[key][key2].level == '3') {
          level3q.push(__WEBPACK_IMPORTED_MODULE_0__build_assets_data_data_json___default.a[key][key2]);
        }
      });
    });
  }

  function enterScene(level) {
    introLevelPanel.children[0].innerText = level.intro;
    introLevelPanel.classList.remove('hidden');
    window.setTimeout(function () {
      introLevelPanel.classList.add('hidden');
      showBattle(level.index);
      nextQuestion(level, currentQuestion);
    }, 2000);
  }

  function clearConsole() {
    consolePanel.innerText = '';
  }

  function nextQuestion(levelData, question) {
    var levelTitle = document.createElement('h3');
    levelTitle.innerHTML = levelData.title;
    levelTitle.classList.add('level-title');
    consolePanel.appendChild(levelTitle);

    var questions = levelData.data;
    for (var c = 0; c < questions.length; c++) {
      if (c === question) {
        var q = document.createElement('p');
        q.setAttribute('data-level', levelData.index);
        q.setAttribute('data-question', c);
        q.innerText = questions[c].question;

        var answers = document.createElement('ul');
        answers.classList.add('answers');

        for (var key in questions[c].answers) {
          if (questions[c].answers.hasOwnProperty(key)) {
            var answer = document.createElement('li');
            answer.innerHTML = questions[c].answers[key];
            answer.setAttribute('data-answer', key);
            answer.setAttribute('data-question', c);
            answer.setAttribute('data-level', levelData.index);
            answers.appendChild(answer);
          }
        }

        q.appendChild(answers);
        consolePanel.appendChild(q);
      }
    }
    answerListeners();
  }

  function updateScreen() {
    selectedEnemyDom.querySelector('.name').innerText = currentEnemy.name;
    selectedEnemyDom.querySelector('.defense').innerText = currentEnemy.defense;
    selectedEnemyDom.querySelector('.attack').innerText = currentEnemy.attack;
    selectedEnemyDom.querySelector('.health').innerText = currentEnemy.health;
    selectedEnemyDom.querySelector('.avatar').src = currentEnemy.avatar;

    selectedHeroDom.querySelector('.name').innerText = currentPlayer.name;
    selectedHeroDom.querySelector('.defense').innerText = currentPlayer.defense;
    selectedHeroDom.querySelector('.attack').innerText = currentPlayer.attack;
    selectedHeroDom.querySelector('.health').innerText = currentPlayer.health;
    selectedHeroDom.querySelector('.avatar').src = currentPlayer.avatar;

    var heroBarValue = 100 - currentPlayer.health;
    var enemyBarValue = 100 - currentEnemy.health;

    heroBar.setAttribute('style', 'width:' + heroBarValue + '%');
    enemyBar.setAttribute('style', 'width:' + enemyBarValue + '%');
  }

  function processAnswer(answer, question, level) {
    switch (level) {
      case levels.level1.index:
        if (levels.level1.data[question].correct == answer) {
          // Correct
          action({ sender: currentPlayer, receiver: currentEnemy, hit: currentPlayer.attack }, levels.level1);
        } else {
          // Bad answer
          action({ sender: currentEnemy, receiver: currentPlayer, hit: currentEnemy.attack }, levels.level1);
        }
        break;
      case levels.level2.index:
        if (levels.level2.data[question].correct == answer) {
          // Correct
          action({ sender: currentPlayer, receiver: currentEnemy, hit: currentPlayer.attack }, levels.level2);
        } else {
          // Bad answer
          action({ sender: currentEnemy, receiver: currentPlayer, hit: currentEnemy.attack }, levels.level2);
        }
        break;
      case levels.level3.index:
        if (levels.level3.data[question].correct == answer) {
          // Correct
          action({ sender: currentPlayer, receiver: currentEnemy, hit: currentPlayer.attack }, levels.level3);
        } else {
          // Bad answer
          action({ sender: currentEnemy, receiver: currentPlayer, hit: currentEnemy.attack }, levels.level3);
        }
        break;

    }
  }

  function action(options, level) {
    var hit = null;
    hit = gameApi.hitEnemy(options);
    updateScreen();
    clearConsole();

    if (currentEnemy.health <= 0) {
      if (currentEnemy.level === 3) {
        winGame();
      } else {
        currentLevel++;
        nextLevel(currentLevel);
      }
    } else {
      if (currentPlayer.health <= 0) {
        gameOver();
      } else {
        if (currentQuestion < level.data.length - 1) {
          currentQuestion++;
          nextQuestion(level, currentQuestion);
        } else {
          currentLevel++;
          nextLevel(currentLevel);
        }
      }
    }
  }

  function gameOver() {
    clearConsole();
    var h1 = document.createElement('h1');
    h1.innerText = 'GAME OVER - to restart reload the page';
    h1.classList.add('gameover');
    consolePanel.appendChild(h1);
    sound({ stop: true }, soundGame);
    sound({ start: true }, soundGameOver);
  }

  function winGame() {
    clearConsole();
    winPanel.classList.remove('hidden');
    sound({ stop: true }, soundGame);
    sound({ start: true }, soundWin);
  }

  function nextLevel() {
    currentQuestion = 0;
    if (currentLevel === 2) {
      enterScene(levels.level2);
      showBattle(levels.level2.index);
    }
    if (currentLevel === 3) {
      enterScene(levels.level3);
      showBattle(levels.level3.index);
    }
  }

  function showBattle(level) {
    cardSelectionPanel.classList.add('hidden');
    if (level === levels.level1.index) {
      clearConsole();
      battlefieldPanel.classList.remove('hidden');
      currentEnemy = gameApi.createPlayer({
        name: 'Inferno',
        playerType: 'enemy',
        attack: 30,
        defense: 20,
        level: 1,
        avatar: 'assets/images/enemy1.jpg'
      });
    }
    if (level === levels.level2.index) {
      clearConsole();
      battlefieldPanel.classList.remove('hidden');
      currentEnemy.name = 'Outworld';
      currentEnemy.attack = 50;
      currentEnemy.defense = 30;
      currentEnemy.health = 120;
      currentEnemy.level = 2;
      currentEnemy.avatar = 'assets/images/enemy2.jpg';
    }
    if (level === levels.level3.index) {
      clearConsole();
      battlefieldPanel.classList.remove('hidden');
      currentEnemy.name = 'Despero';
      currentEnemy.attack = 100;
      currentEnemy.defense = 50;
      currentEnemy.health = 150;
      currentEnemy.level = 3;
      currentEnemy.avatar = 'assets/images/enemy3.jpg';
    }

    updateScreen();
  }

  function addListeners() {
    [].forEach.call(document.querySelectorAll('button'), function (a) {
      a.addEventListener('click', function () {
        switch (a.id) {
          case 'start':
            sound({ stop: true }, soundIntro);
            sound({ start: true }, soundButton);
            sound({ start: true }, soundGame);
            transition(scenarioPanel);
        }
      }, false);
    });
  }

  function answerListeners() {
    [].forEach.call(document.querySelectorAll('li'), function (a) {
      a.addEventListener('click', function () {
        processAnswer(a.dataset.answer, a.dataset.question, a.dataset.level);
        sound({ start: true }, soundHit);
      }, false);
    });
  }

  function cardListeners() {
    [].forEach.call(document.querySelectorAll('div'), function (a) {
      a.addEventListener('click', function (e) {
        switch (a.id) {
          case 'hero1':
            currentPlayer = gameApi.createPlayer({
              name: 'The Butcher',
              playerType: 'hero',
              attack: 50,
              defense: 20,
              avatar: 'assets/images/warrior1.jpg'
            });
            sound({ start: true }, soundWarrior1);
            enterScene(levels.level1);
            break;
          case 'hero2':
            currentPlayer = gameApi.createPlayer({
              name: 'Magician',
              playerType: 'hero',
              attack: 30,
              defense: 30,
              avatar: 'assets/images/warrior2.jpg'
            });
            sound({ start: true }, soundWarrior2);
            enterScene(levels.level1);
            break;
          case 'hero3':
            currentPlayer = gameApi.createPlayer({
              name: 'The Warrior',
              playerType: 'hero',
              attack: 30,
              defense: 40,
              avatar: 'assets/images/warrior3.jpg'
            });
            sound({ start: true }, soundWarrior3);
            enterScene(levels.level1);
            break;
        }
      }, false);
    });
  }

  function transition(to) {
    introPanel.classList.add('hidden');
    scenarioPanel.classList.add('hidden');
    gameOverPanel.classList.add('hidden');
    to.classList.remove('hidden');
  }

  function sound(music, soundFile) {
    if (music.start === true) {
      soundFile.play();
    }
    if (music.stop === true) {
      soundFile.pause();
      soundFile.currentTime = 0;
    }
  }

  return;
}();

function apiScreen() {
  return Screen;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
	"questions": {
		"one": {
			"question": "what is hoisting?",
			"answers": {
				"a": "A way to maintain the scope in the application",
				"b": "Default behavior of moving declarations to the top.",
				"c": "A way to implement objects"
			},
			"level": "1",
			"correct": "b"
		},
		"two": {
			"question": "what is scope?",
			"answers": {
				"a": "Is the set of variables, objects, and functions you have access to",
				"b": "Is how you can access to a variable",
				"c": "Is a way to modify an object"
			},
			"level": "1",
			"correct": "a"
		},
		"three": {
			"question": "What is a global variable?",
			"answers": {
				"a": "Is a variable defined in the head of the page",
				"b": "Is a variable that you can access in any place of the application",
				"c": "Is a variable without scope"
			},
			"level": "1",
			"correct": "a"
		},
		"four": {
			"question": "what is the result for 1 + \"1\"?",
			"answers": {
				"a": "\"2\"",
				"b": "11",
				"c": "\"11\""
			},
			"level": "1",
			"correct": "c"
		},
		"five": {
			"question": "what is the result of this: typeof [1,2,3,4]",
			"answers": {
				"a": "Array",
				"b": "String",
				"c": "Object"
			},
			"level": "1",
			"correct": "b"
		},
		"six": {
			"question": "what is the result of this: typeof null",
			"answers": {
				"a": "Null",
				"b": "Undefined",
				"c": "Object"
			},
			"level": "2",
			"correct": "c"
		},
		"seven": {
			"question": "If you compare null === undefined and null == undefined what is the result?",
			"answers": {
				"a": "True",
				"b": "False",
				"c": "Null"
			},
			"level": "2",
			"correct": "b"
		},
		"eight": {
			"question": "If you compare null === undefined and null == undefined what is the result?",
			"answers": {
				"a": "True",
				"b": "False",
				"c": "Null"
			},
			"level": "2",
			"correct": "b"
		},
		"nine": {
			"question": "A function parameter is:",
			"answers": {
				"a": "Names listed in the function definition",
				"b": "Values received by the function",
				"c": "Values that the function returns"
			},
			"level": "2",
			"correct": "a"
		},
		"ten": {
			"question": "The definition var a = function() runs equal that function a()?",
			"answers": {
				"a": "Yes",
				"b": "No",
				"c": "Is the same"
			},
			"level": "2",
			"correct": "b"
		},
		"eleven": {
			"question": "What is the result of this regular expression: /e/.exec(\"The best things in life are free!\");",
			"answers": {
				"a": "e",
				"b": "True",
				"c": "Undefined"
			},
			"level": "3",
			"correct": "a"
		},
		"twelve": {
			"question": "If you are using \"use strict\" what is the result for this definition: x = 4*5;",
			"answers": {
				"a": "20",
				"b": "Error",
				"c": "Undefined"
			},
			"level": "3",
			"correct": "b"
		},
		"thirteen": {
			"question": "If you are using \"use strict\" what is the result for this definition: var public = 1500;",
			"answers": {
				"a": "1500",
				"b": "Error",
				"c": "Undefined"
			},
			"level": "3",
			"correct": "b"
		},
		"fourteen": {
			"question": "If you have: var person = {firstName:\"John\", lastName:\"Doe\", age:46}, what is the result for: person.length",
			"answers": {
				"a": "Error",
				"b": "Undefined",
				"c": "2"
			},
			"level": "3",
			"correct": "b"
		},
		"fifteen": {
			"question": "What means that an object can be mutable?",
			"answers": {
				"a": "They are addressed by reference, not by value.",
				"b": "They are addressed by value, not by reference.",
				"c": "They are addressed by reference and value."
			},
			"level": "3",
			"correct": "a"
		}
	}
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);