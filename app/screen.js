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
      data: level1q  
    },
    level3: 
    {
      index: 'level3',
      title: 'Level 3',
      intro: 'Level 3 starting, get ready!',
      data: level1q  
    },
  };

  // Music and Sounds
  var soundIntro = new Audio('assets/music/intro.mp3');
  var soundButton = new Audio('assets/music/button.wav');
  
  addListeners();
  cardListeners();
  init();

  function init() {
    introMusic({ start: true });
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

  function showIntro(introNumber) {
    if (introNumber === levels.level1.index) {
      introLevelPanel.children[0].innerText = levels.level1.intro;
      introLevelPanel.classList.remove('hidden');
      window.setTimeout(function() {
        introLevelPanel.classList.add('hidden');
        showBattle(levels.level1.index);
        printQuestion(levels.level1);
      }, 2000);
      
    }
    if (introNumber === levels.level2.index) {
      printQuestion(levels.level2);
    }
    if (introNumber === levels.level3.index) {
      printQuestion(levels.level3);
    }
  }

  function clearConsole() { 
    consolePanel.innerText = '';
  }

  function printQuestion(levelData) {
    nextQuestion(levelData, currentQuestion);
    answerListeners();
  }

  function nextQuestion(levelData, question) {

    console.log(levelData.data);
    var levelTitle = document.createElement('h3');
    levelTitle.innerHTML = levelData.title;
    levelTitle.classList.add('level-title');
    consolePanel.appendChild(levelTitle);

    var questions = levelData.data;
    for (var c = 0; c < questions.length; c++) {
      if (c === question) {
        var currentId = c;
        var q = document.createElement('p');
        q.setAttribute('data-level', levelData.index);
        q.setAttribute('data-question', currentId);
        q.innerText = questions[c].question;

        var answers = document.createElement('ul');
        answers.classList.add('answers');

        for (var key in questions[c].answers) {
          if (questions[c].answers.hasOwnProperty(key)) {
            var answer = document.createElement('li');
            answer.innerHTML = questions[c].answers[key];
            answer.setAttribute('data-answer', key);
            answer.setAttribute('data-question', currentId);
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
    
    var heroBarValue = 100 - currentPlayer.health;
    var enemyBarValue = 100 - currentEnemy.health;

    heroBar.setAttribute('style', 'width:' + heroBarValue + '%');
    enemyBar.setAttribute('style', 'width:' + enemyBarValue + '%');
    
  }

  function processAnswer(answer, question, level) {
    var hit = null;
    switch (level) {
      case levels.level1.index :
      if (levels.level1.data[question].correct == answer) {
        // Correct
        hit = gameApi.hitEnemy({sender: currentPlayer, receiver: currentEnemy, hit: currentPlayer.attack})
        console.log('CORRECT');
      } else {
        // Bad answer
        hit = gameApi.hitEnemy({sender: currentEnemy, receiver: currentPlayer, hit: currentEnemy.attack})
        console.log('INCORRECT');
      }

      updateScreen();
      clearConsole();

      if (currentPlayer.health <= 0) {
        console.log('YOU LOSE!');
      } else {
        if (currentQuestion < levels.level1.data.length - 1) {
          currentQuestion++;
          nextQuestion(levels.level1, currentQuestion);
        } else {
          currentLevel++;
          nextLevel(currentLevel);
        }
        
      }

      break;
      case levels.level2.index :
      if (levels.level2.data[question].correct == answer) {
        // Correct
        hit = gameApi.hitEnemy({sender: currentPlayer, receiver: currentEnemy, hit: currentPlayer.attack})
      } else {
        // Bad answer
        hit = gameApi.hitEnemy({sender: currentEnemy, receiver: currentPlayer, hit: currentEnemy.attack})
      }

      if (currentPlayer.health <= 0) {
        console.log('YOU LOSE!');
      }
    
      updateScreen();
      
      break;
      case levels.level3.index :
      if (levels.level3.data[question].correct == answer) {
        // Correct
        hit = gameApi.hitEnemy({sender: currentPlayer, receiver: currentEnemy, hit: currentPlayer.attack})
      } else {
        // Bad answer
        hit = gameApi.hitEnemy({sender: currentEnemy, receiver: currentPlayer, hit: currentEnemy.attack})
      }

      if (currentPlayer.health <= 0) {
        console.log('YOU LOSE!');
      }
    
      updateScreen();
      
      break;

    }
  }

  function nextLevel() {
    if (currentLevel === 2) {
      showBattle(levels.level2.index);
    }
    console.log('LEVEL EEEE');
  }


  function sendConsoleMessage(message) {
    console.log(message);
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
      currentEnemy.name = 'Outworld',
      currentEnemy.attack = 50;
      currentEnemy.defense = 30;
      currentEnemy.health = 100;
      currentEnemy.level = 2
      currentEnemy.avatar = 'assets/images/enemy2.jpg';
    }
    if (level === levels.level3.index) {
      clearConsole();
      battlefieldPanel.classList.remove('hidden');
    }

    updateScreen();
  }

  function addListeners() {
    [].forEach.call( document.querySelectorAll( 'button' ), function ( a ) {
      a.addEventListener( 'click', function () {
          switch (a.id) {
            case 'start':
            introMusic({ stop: true });
          }
      }, false );
    });
  }

  function answerListeners() {
    [].forEach.call( document.querySelectorAll( 'li' ), function ( a ) {
      a.addEventListener( 'click', function () {
          processAnswer(a.dataset.answer, a.dataset.question, a.dataset.level);
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
                defense: 20
            });
            showIntro(levels.level1.index);
            break;
            case 'hero2':
            currentPlayer = gameApi.createPlayer({
                name: 'Nightmare',
                playerType: 'hero',
                attack: 30,
                defense: 20
            });
            showIntro(levels.level2.index);
            break;
            case 'hero3':
            currentPlayer = gameApi.createPlayer({
                name: 'Akara',
                playerType: 'hero',
                attack: 20,
                defense: 50
            });
            showIntro(levels.level3.index);
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

  function introMusic(music) {
    if (music.start === true) {
      soundIntro.play();
    }
    if (music.stop === true) {
      soundIntro.pause();
      soundIntro.currentTime = 0;
      soundButton.play();
      transition(scenarioPanel);
    }
  }
  
  return;
})();

export function apiScreen(){
  return Screen;
};