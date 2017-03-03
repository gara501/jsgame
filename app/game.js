// Using Module Pattern
'use strict';

var Game = (function (options) {
  function hitEnemy(options) {
    var sender = options.sender;
    var receiver = options.receiver;
    options.receiver.decreaseHealth(options.hit);

    if (receiver.health < 0) {
      return options.sender.name + ' Wins!';
    }

    return; 
  };

  function restart(options) {
    options.player1.restart();
    options.player2.restart();
    return;
  }

  function powerUp(options) {
    var player = options.player;
    player.powerUp(options.power);
    return; 
  };


  return {
    hitEnemy: hitEnemy,
    powerUp: powerUp,
    restart: restart
  }
})();

export function apiGame(){
  return Game;
};