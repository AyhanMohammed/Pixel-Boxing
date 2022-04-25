class Game {
    constructor() {
      this.active = false;
      this.pause = false;
      this.life1 = 250;
      this.life2 = 250;
    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }

    update(state) {
        database.ref("/").update({
          gameState: state
        });
      }
    
    start() {
        player = new Player();
        playerCount = player.getCount();
    
        form = new Form();
        form.display();

        boxer1 = createSprite(width / 2 + 300,height - 300);
        boxer1.addImage("redboxer",redboxer);
        boxer1.addImage("redboxerFlip",redflip)
        boxer1.addAnimation("walking",redboxerWalk);
        boxer1.addAnimation("walkingFlip",redwalkFlip)
        boxer1.addAnimation("redpunch",redboxerPunch);
        boxer1.addAnimation("redpunchFlip",redflipPunch);
        boxer1.addAnimation("redDead",redboxerDead);
        boxer1.debug = false;
        boxer1.setCollider("rectangle",-5,5,30,80);

        boxer1.changeImage("redboxer");
      
        boxer1.scale = 3;

        boxer2 = createSprite(width / 2 - 300,height - 300);
        boxer2.addImage("blueboxer",blueflip);
        boxer2.addImage("blueboxerFlip",blueboxer);
        boxer2.addAnimation("blueboxerWalk",bluewalkFlip);
        boxer2.addAnimation("blueboxerWalkFlip",blueboxerWalk);
        boxer2.addAnimation("bluepunch",blueflipPunch);
        boxer2.addAnimation("bluepunchFlip",blueboxerPunch);
        boxer2.addAnimation("blueDead",blueboxerDead);
        boxer2.debug = false;
        boxer2.setCollider("rectangle",5,5,30,80);

        boxer2.changeImage("blueboxer");

        boxer2.scale = 3;

      }

    play() {

      background(bg);

      this.handlePlayerControls();

      this.showRedLife();
      this.showBlueLife();

      pauseButton = createImg("assets/pauseimage.png");
      pauseButton.position(width / 2 - 30,50);
      pauseButton.size(50,50);
      pauseButton.mousePressed(() => {
        this.pause = true;
        keyRel = true;
        this.pauseClick();
      })

      if (this.life1 <= 0) {
        boxer1.changeAnimation("redDead");
        this.pause = true;
        this.life1 = 0;
        fill("red");
        rect(width / 2 - 650, height - 650, 250, 20);
      }

      if (this.life2 <= 0) {
        boxer2.changeAnimation("blueDead");
        this.pause = true;
        this.life2 = 0;
        fill("red");
        rect(width / 2 - 650, height - 650, 250, 20);
      }

      
        
      
      drawSprites()
    }

    pauseClick() {
        resume = createImg("assets/resumeimage.png");
        resume.position(width / 2-40,height / 2);
        resume.size(80,80);
        resume.mousePressed(() => {
          this.pause = false;
          keyRel = false;
          resume.hide();
          restart.hide();
          home.hide();
        })
    
        restart = createImg("assets/restartimage.png");
        restart.position(width / 2-120,height / 2);
        restart.size(80,80);
    
        home = createImg("assets/homeimage.png");
        home.position(width / 2+40,height / 2);
        home.size(80,80);
        home.mousePressed(() => {
          location.reload();
        })
    }

    showBlueLife() {
      push();
      fill("white");
      rect(width / 2 - 650, height - 650, 250, 20);
      fill("green");
      rect(width / 2 - 650, height - 650, this.life2, 20);
      noStroke();
      pop();
    }

    showRedLife() {
      push();
      fill("white");
      rect(width / 2 + 400, height - 650, 250, 20);
      fill("green");
      rect(width / 2 + 400, height - 650, this.life1, 20);
      noStroke();
      pop();
    }

    handlePlayerControls() {
      if (!this.pause) {
      if (keyDown("a")) {
        boxer1.position.x = boxer1.position.x - 5;
        boxer1.changeAnimation("walking");
        this.active = true;
        
      }
    
     if (keyDown("d")) {
        boxer1.position.x = boxer1.position.x + 5;
        boxer1.changeAnimation("walkingFlip");
        this.active = false;
      }

      if (keyDown(RIGHT_ARROW)) {
        boxer2.position.x = boxer2.position.x + 5;
        boxer2.changeAnimation("blueboxerWalk");
        this.active = true;
      }

      if (keyDown(LEFT_ARROW)) {
        boxer2.position.x = boxer2.position.x - 5;
        boxer2.changeAnimation("blueboxerWalkFlip");
        this.active = false;
      }

      if (keyDown("e") && this.active == true) {
        boxer1.changeAnimation("redpunch");
        if (boxer1.isTouching(boxer2)) {
          this.life2 = this.life2 - 2;
        }
      }

      if (keyDown("e") && this.active == false) {
        boxer1.changeAnimation("redpunchFlip");
        if (boxer1.isTouching(boxer2)) {
          this.life2 = this.life2 - 2;
        }
      }

      if (keyDown("space") && this.active == true) {
        boxer2.changeAnimation("bluepunch");
        if (boxer2.isTouching(boxer1)) {
          this.life1 = this.life1 - 2;
        }
      }

      if (keyDown("space") && this.active == false) {
        boxer2.changeAnimation("bluepunchFlip");
        if (boxer2.isTouching(boxer1)) {
          this.life1 = this.life1 - 2;
        }
      }
    }
    }
}


function keyReleased() {
  if (keyCode == 65 && !keyRel) {
    boxer1.changeImage("redboxer");
  }
  if (keyCode == 68 && !keyRel) {
    boxer1.changeImage("redboxerFlip")
  }
  if (keyCode == 39 && !keyRel) {
    boxer2.changeImage("blueboxer");
  }
  if (keyCode == 37 && !keyRel) {
    boxer2.changeImage("blueboxerFlip")
  }
  /*if (keyCode == 69) {
    boxer1.changeImage("redboxer");
  }
  if (keyCode == 69) {
    boxer1.changeImage("redboxerFlip")
  }*/
}

