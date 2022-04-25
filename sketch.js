var canvas;
var database, gameState,game,player,playerCount,form;
var bg, bgHome;
var boxer1, boxer2;
var redboxer, blueboxer, redboxerPunch, blueboxerPunch, redboxerWalk, blueboxerWalk, redboxerDead, blueboxerDead;
var pauseButton, resume, home, restart;
var redflip, redflipPunch,redwalkFlip, reddeadFlip, blueflip, blueflipPunch, bluewalkFlip, bluedeadFlip;
var keyRel = false;


function preload() {
  bg = loadImage("assets/bg.jpg");
  bgHome = loadImage("assets/bghome.png");
  redboxer = loadImage("assets/redboxer.png");
  redboxerPunch = loadAnimation("assets/redboxerpunch1.png","assets/redboxerpunch2.png")
  redboxerWalk = loadAnimation("assets/redboxerwalk.png","assets/redboxer.png")
  redboxerDead = loadImage("assets/reddead.png");
  blueboxer = loadImage("assets/blueboxer.png");
  blueboxerPunch = loadAnimation("assets/blueboxerpunch1.png","assets/blueboxerpunch2.png");
  blueboxerWalk = loadAnimation("assets/blueboxerwalk.png","assets/blueboxer.png");
  blueboxerDead = loadImage("assets/bluedead.png")
  redflip = loadImage("assets/redflip.png");
  redflipPunch = loadAnimation("assets/redflip2.png","assets/redflip3.png");
  redwalkFlip = loadAnimation("assets/redwalkflip.png","assets/redflip.png");
  reddeadFlip = loadImage("assets/reddeadflip.png");
  blueflip = loadImage("assets/blueflip.png");
  blueflipPunch = loadAnimation("assets/blueflip2.png","assets/blueflip3.png");
  bluewalkFlip = loadAnimation("assets/bluewalkflip.png","assets/blueflip.png");
  bluedeadFlip = loadImage("assets/bluedeadflip.png");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  database = firebase.database();

  game = new Game()
  game.start();

  gameState = 0;

}

function draw() {
  background(bgHome)
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }


}