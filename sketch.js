// creating the variables
var spaceShip, asteroids, coins, rockets;
var gameState;
var score;
var rocketsGroup, asteroidsGroup, coinsGroup;

function preload(){
  bgImg = loadImage('spaceBg.png');
  spaceShipImg = loadImage('spaceShip.png');
  missileImg = loadImage('missile.png');
  asteroidImg = loadImage('asteroid.png');
  coinsImg = loadImage('coins.png');
}
function setup() {
  createCanvas(displayWidth,displayHeight);

  bg = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bg.visible = false;

  spaceShip = createSprite(displayWidth/2, displayHeight/2 + 250, 20, 20);
  spaceShip.addImage(spaceShipImg);
  spaceShip.scale = 0.4;
  spaceShip.setCollider('rectangle', 0, 0, 270, 300);

  rocketsGroup = new Group();
  asteroidsGroup = new Group();
  coinsGroup = new Group();

  score = 0;

  gameState = 1;

}

function draw() {
  background(bgImg);  

  if(gameState = 1){
    spaceShip.x = mouseX;

    spawnRockets();
    spawnAsteroid();
    spawnCoins();
  
    drawSprites();
  
    fill('yellow');
    textFont('bradley hand');
    textSize(30);
    text('Score = ' + score, displayWidth/2 - 50, spaceShip.y + 150);
  
    if(rocketsGroup.isTouching(asteroidsGroup)){
      score = score + 2
      asteroidsGroup.destroyEach();
      rocketsGroup.destroyEach();
    }
  
    if(asteroidsGroup.isTouching(spaceShip)){
      spaceShip.destroy();
      fill('yellow');
      textFont('bradley hand');
      textSize(30);
      text('Game Over !!', displayWidth/2 - 100, displayHeight/2);

      asteroidsGroup.remove(asteroids)
      coins.remove(coins);
      rocketsGroup.remove(rockets);
    }
  
    if(coinsGroup.isTouching(spaceShip)){
      score++
      coinsGroup.destroyEach();
    }
  }

  if(gameState = 2){
    
  }

}

function spawnRockets(){
  if(mousePressedOver(bg)){
    rockets = createSprite(spaceShip.x, spaceShip.y - 30, 10, 10);
    rockets.addImage(missileImg);
    rockets.scale = 0.5
    rockets.velocityY = -20;
    rocketsGroup.add(rockets);
  }
}

function spawnAsteroid(){
  if(frameCount % 50 === 0){
    asteroids = createSprite(random(0, displayWidth), -20, 10, 10);
    asteroids.velocityY = 20;
    asteroids.addImage(asteroidImg);
    asteroids.scale = 1;
    asteroids.setCollider('circle', 0, 0, 120)
    asteroidsGroup.add(asteroids);
  }
}

function spawnCoins(){
  if(frameCount % 100 === 0){
    coins = createSprite(random(0, displayWidth - 100), -20, 10, 10);
    coins.velocityY = 10;
    coins.addImage(coinsImg);
    coins.scale = 0.2;
    coins.setCollider('circle', 0,0, 130);
    coinsGroup.add(coins);
  }
}

