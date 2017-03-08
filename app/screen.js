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
  var selectedPlayer = null;
  var gameApi = new apiGame();

  // Questions Arrays
  var level1q = []; 
  var level2q = []; 
  var level3q = [];

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
    if (introNumber === 'level1') {
      introLevelPanel.children[0].innerText = 'Level 1 starting, be ready!';
      introLevelPanel.classList.remove('hidden');
      window.setTimeout(function() {
        introLevelPanel.classList.add('hidden');
        showBattle('level1');
      }, 2000);
    }
    if (introNumber === 'level2') {
      
    }
    if (introNumber === 'level3') {
      
    }
  }

  function clearConsole() {
    var texts = consolePanel.children; 
    for (var i = 0; i < texts.length; i++) {
      texts[i].innerText = '';
    }
  }

  function sendConsoleMessage() {

  }

  function showBattle(level) {
    cardSelectionPanel.classList.add('hidden');
    if (level === 'level1') {
      console.log('My hero is:', selectedPlayer);
      clearConsole();
      battlefieldPanel.classList.remove('hidden');

    }
    if (level === 'level2') {
      
    }
    if (level === 'level3') {
      
    }
  }

  function addListeners() {
    [].forEach.call( document.querySelectorAll( 'button' ), function ( a ) {
      a.addEventListener( 'click', function () {
          switch (a.id) {
            case 'start':
            introMusic({ stop: true });
            introMusic({ stop: true });
          }
      }, false );
    });
  }

  function cardListeners() {
    [].forEach.call( document.querySelectorAll( 'div' ), function ( a ) {
      a.addEventListener( 'click', function (e) {
          switch (a.id) {
            case 'hero1':
            selectedPlayer = gameApi.createPlayer({
                name: 'The Butcher',
                playerType: 'hero',
                attack: 50,
                defense: 20
            });
            showIntro('level1');
            break;
            case 'hero2':
            selectedPlayer = gameApi.createPlayer({
                name: 'Nightimare',
                playerType: 'hero',
                attack: 30,
                defense: 20
            });
            showIntro('level1');
            break;
            case 'hero3':
            selectedPlayer = gameApi.createPlayer({
                name: 'Akara',
                playerType: 'hero',
                attack: 20,
                defense: 50
            });
            showIntro('level1');
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