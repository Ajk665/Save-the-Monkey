var END = 0;
var PLAY = 1;
var gameState = 1;

var score = 0;
var survivalTime = 0

var monkey2;

function preload(){
  
  
  banana1 = loadImage("banana.png");
  
  monkey2 = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

  obstacle = loadImage("obstacle.png");
  
}

function setup() {
  
  createCanvas(600, 350);
 
  monkey = createSprite(50,260,10,20);
  monkey.addAnimation("running",monkey2);
  monkey.scale = 0.1
  
  Ground1 = createSprite(300,340,600,10);
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  
}


function draw() {
  background("lightblue");

  
  fill("black")
  text("Score = "+ score,500,25 );
  text("Survival Time = " + survivalTime,100,25);
  
  if(gameState == PLAY){
      
      restart = createSprite(300,150,70,50);
      restart.visible = false;
    
    if(Ground1.x <0){
      Ground1.x = 600;
    }
      monkey.visible = true
      if(keyDown("space") && monkey.y >= 304.3 ){
          monkey.velocityY = -13;
      }
      monkey.velocityY += 0.5
      for(var i = 0;i < bananaGroup.length;i++){
            if(bananaGroup.get(i).isTouching(monkey)){
               bananaGroup.get(i).remove();
               score = score + 1;
            }
      }
    
    console.log(monkey.y);
      survivalTime = survivalTime + 1;  
    
      if(score%10 == 0 && score > 0){

      } 
      if(obstaclesGroup.isTouching(monkey)){
         gameState = END;

      }
   
    SpawnStone();
    banana();
      
  }else if(gameState == END){
    
    score = 0;
    survivalTime = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);

    fill("black")
    text("RESTART",265,150)
    
    if(mousePressedOver(restart)){
      gameState = PLAY;
      obstaclesGroup.destroyEach();
      bananaGroup.destroyEach();
      restart.visible = false;
    }
    
    monkey.visible = false;
    restart.visible = false;
    
    monkey.velocityY = 0;
    Ground1.velocityX = 0;
  }
   monkey.collide(Ground1);
   drawSprites();

}


function SpawnStone(){
  
  if(World.frameCount % 100 == 0){
    obstacle1 = createSprite(600,320,10,20);
    obstacle1.addImage(obstacle);
    obstacle1.scale = 0.1;
    obstacle1.velocityX = -5 - survivalTime/1000 ;
    obstacle1.lifetime = 200;
    obstacle1.depth = monkey.depth - 1;
    obstaclesGroup.add(obstacle1);
    console.debug(obstacle1)
  }
 
}

function banana(){
  
  if(World.frameCount % 60 === 0){
  banana2 = createSprite(600,Math.round(random(125,150)));
  banana2.addImage(banana1);
  banana2.scale = 0.1  
  banana2.velocityX = -3;
  banana2.lifetime = 200
  banana2.depth = monkey.depth - 1;
  bananaGroup.add(banana2);
}
}