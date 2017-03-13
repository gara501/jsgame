// Using Module Pattern
'use strict';
import { apiCharacters } from "./characters.js";

var Game = (function (options) {
  var apiChar =  new apiCharacters();

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
  }
})();

export function apiGame(){
  return Game;
};