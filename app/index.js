import { apiGame } from "./game.js";
import { apiCharacters } from "./characters.js";


var api =  new apiCharacters();
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

var newGame = new apiGame();
newGame.hitEnemy({sender: ryu, receiver: akuma, hit: ryu.attack});

console.log('HEROE', ryu);
console.log('HEROE 2', ken);
console.log('villano', akuma);

newGame.hitEnemy({sender: ryu, receiver: akuma, hit: ryu.attack});
console.log('villano', akuma);

newGame.powerUp({player:ryu, power: 30});
console.log('ryu', ryu);

newGame.hitEnemy({sender: ryu, receiver: akuma, hit: ryu.attack});
console.log('villano', akuma);

newGame.restart({player1: ryu, player2: akuma});

console.log('HEROE', ryu);
console.log('HEROE 2', ken);
console.log('villano', akuma);