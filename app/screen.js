'use strict';
import dataJson from '../build/assets/data/data.json';
import { apiGame } from "./game.js";

var Screen = (function (options) {
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
  var gameApi = new apiGame();

  // Questions Arrays
  
  var level1q = []; 
  var level2q = []; 
  var level3q = [];
  var levels = {
    level1: 
    {
      index: 'level1',
      title: 'Level 1',
      intro: 'Level 1 starting, get ready!',
      data: level1q
    },
    level2: 
    {
      index: 'level2',
      title: 'Level 2',
      intro: 'Level 2 starting, get ready!',
      data: level2q  
    },
    level3: 
    {
      index: 'level3',
      title: 'Level 3',
      intro: 'Level 3 starting, get ready!',
      data: level3q  
    },
  };

  // Music and Sounds
  var soundIntro = new Audio('assets/music/intro.mp3');
  var soundHit = new Audio('assets/music/hit2.wav');
  var soundWin = new Audio('assets/music/level1.mp3');
  var soundGameOver = new Audio('assets/music/gameOver.mp3');
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
    var questions = Object.keys(dataJson).forEach(function(key) {
      Object.keys(dataJson[key]).forEach(function(key2) {
        if (dataJson[key][key2].level == '1') {
          level1q.push(dataJson[key][key2]);
        } 
        if (dataJson[key][key2].level == '2') {
          level2q.push(dataJson[key][key2]);
        } 
        if (dataJson[key][key2].level == '3') {
          level3q.push(dataJson[key][key2]);
        } 
      });
    });
  }

  function enterScene(level) {
    introLevelPanel.children[0].innerText = level.intro;
    introLevelPanel.classList.remove('hidden');
    window.setTimeout(function() {
      introLevelPanel.classList.add('hidden');
      showBattle(level.index);
      nextQuestion(level, currentQuestion)
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
      case levels.level1.index :
      if (levels.level1.data[question].correct == answer) {
        // Correct
        action({sender: currentPlayer, receiver: currentEnemy, hit: currentPlayer.attack}, levels.level1);
      } else {
        // Bad answer
        action({sender: currentEnemy, receiver: currentPlayer, hit: currentEnemy.attack}, levels.level1);
      }
      break;
      case levels.level2.index :
      if (levels.level2.data[question].correct == answer) {
        // Correct
        action({sender: currentPlayer, receiver: currentEnemy, hit: currentPlayer.attack}, levels.level2);
      } else {
        // Bad answer
        action({sender: currentEnemy, receiver: currentPlayer, hit: currentEnemy.attack}, levels.level2);
      }
      break;
      case levels.level3.index :
      if (levels.level3.data[question].correct == answer) {
        // Correct
        action({sender: currentPlayer, receiver: currentEnemy, hit: currentPlayer.attack}, levels.level3);
      } else {
        // Bad answer
        action({sender: currentEnemy, receiver: currentPlayer, hit: currentEnemy.attack}, levels.level3);
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
      if (currentEnemy.level === 3 ) {
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
    sound({start: true}, soundGameOver);
  }

  function winGame() {
    clearConsole();
    winPanel.classList.remove('hidden');
    sound({ stop: true }, soundGame);
    sound({start: true}, soundWin);
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
      currentEnemy  = gameApi.createPlayer({
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
      currentEnemy.level = 2
      currentEnemy.avatar = 'assets/images/enemy2.jpg';
    }
    if (level === levels.level3.index) {
      clearConsole();
      battlefieldPanel.classList.remove('hidden');
      currentEnemy.name = 'Despero';
      currentEnemy.attack = 100;
      currentEnemy.defense = 50;
      currentEnemy.health = 150;
      currentEnemy.level = 3
      currentEnemy.avatar = 'assets/images/enemy3.jpg';
    }

    updateScreen();
  }

  function addListeners() {
    [].forEach.call( document.querySelectorAll( 'button' ), function ( a ) {
      a.addEventListener( 'click', function () {
          switch (a.id) {
            case 'start':
            sound({ stop: true }, soundIntro);
            sound({ start: true }, soundButton);
            sound({ start: true }, soundGame);
            transition(scenarioPanel);
          }
      }, false );
    });
  }

  function answerListeners() {
    [].forEach.call( document.querySelectorAll( 'li' ), function ( a ) {
      a.addEventListener( 'click', function () {
          processAnswer(a.dataset.answer, a.dataset.question, a.dataset.level);
          sound({ start: true }, soundHit);
      }, false );
    });
  }

  function cardListeners() {
    [].forEach.call( document.querySelectorAll( 'div' ), function ( a ) {
      a.addEventListener( 'click', function (e) {
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
          
      }, false );
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
})();

export function apiScreen(){
  return Screen;
};