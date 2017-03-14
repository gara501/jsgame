// Using Module Pattern
'use strict';
var Characters = (function (options) {
    var player = function(options) {
        this.health = 100;
        this.attack = options.attack || 10;
        this.defense = options.defense || 10;
        this.name = options.name || 'Jhon Doe';
        this.playerType = options.playerType || 'hero';
        this.level = options.level || 1;
        this.avatar = options.avatar || '';
        
        this.decreaseHealth = function(hit) {
          if (this.health > 0) {
            this.health -= hit;
          } 
          if (this.health <= 0) {
            this.health = 0;
          }
        };


        this.powerUp = function(power) {
          this.attack += power;
        };

        this.powerUpDefense = function(power) {
          this.defense += power;
        };

        this.restart = function() {
          this.health = 100;
          this.attack = 10;
          this.defense = 10;
        }
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
    }
    
})();

export function apiCharacters(){
  return Characters;
};