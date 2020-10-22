var PLAY=1;

var END=0;

var gameState=PLAY;
var Jordan,ball,Hoop,ground;
var HoopImage,JordanImage,ballImage,gameover,Curry1;
var powerUp=0;
var jump=15;
var score=0;

function preload(){
    JordanImage=loadAnimation("Images/Jordan1.jpg","Images/Jordan2.jpg","Images/Jordan3.jpg");  
    Jordanjump=loadAnimation("Images/Jordan1.jpg");
    HoopImage=loadImage("Images/Hoop.png");
    ballImage=loadImage("Images/ball.png");
    gameover=loadAnimation("Images/Gameover.png");
    Curry1=loadImage("Images/Curry.jpg");
}
function setup(){
Jordan=createSprite(50,345,20,40);
Jordan.addAnimation("Running",JordanImage);
Jordan.addAnimation("jump",Jordanjump);
Jordan.addAnimation("Gameover",gameover);
Hoop=createSprite(180,100,20,40);
Hoop.addImage(HoopImage);
Hoop.scale=0.5;

ball=createSprite(50,345,10,10);
ball.addImage(ballImage);
ball.scale=0.1;
ball.visible=false;
ground=createSprite(300,390,600,10);
ground.velocityX=-4;

ground.shapeColor="white                                                                                                                                                                                                                                     ";
Obstaclegroup = createGroup();
}
function draw() {
  background("white");
  drawSprites();
  text("score:"+score,300,20);
  text("Hoop Stars",30,20);
  createEdgeSprites();
  if(score===50){
    text("You Win",150 ,150);
    gameState=2;
  }
  if(ground.x<0){
    ground.x=ground.width/2;
  }
if(gameState===2){
  Jordan.velocityX=0;
   Jordan.velocityY=0;
    Obstaclegroup.destroyEach();
    Jordan.x=200;
    Jordan.y=200;
    Jordan.scale=1.8;
    //playSound("sound://category_female_voiceover/game_over_female.mp3");
    Hoop.visible=false;
}
  if(keyDown("space")){
    Jordan.velocityY=-7;
  }
 Jordan.velocityY=Jordan.velocityY+0.8; 
 Jordan.collide(ground);
 if(keyWentDown("up")){
  Jordan.changeAnimation("Running",JordanImage);
   ball.visible=true;
   //ball.velocityX=6;
   //ball.rotation=45;
   powerUp += 0.01;
  powerUp = constrain(powerUp, 0, 10);
 }
if (keyWentUp(UP_ARROW) ){
  ball.velocityY = -jump - powerUp;
  ball.velocityX = jump/2 + powerUp/2;
  Jordan.changeAnimation("jumping", Jordanjump);
   //player.setSpeed(30, 280);
  //swish.play();
}
 
 if(ball.isTouching(Hoop)){
     ball.visible=false;
     score=score+2;
   }
 Curry();
 if(Obstaclegroup.isTouching(Jordan)){
   gameState=END;
 }
 if(gameState===END){
   Jordan.velocityX=0;
   Jordan.velocityY=0;
    Obstaclegroup.destroyEach();
    Jordan.changeAnimation("Gameover", gameover);
    Jordan.x=200;
    Jordan.y=200;
    Jordan.scale=1.8;
    //playSound("sound://category_female_voiceover/game_over_female.mp3");
    Hoop.visible=false;
 }
 
 //Curry.collide(ground);
}
function Curry(){
if(World.frameCount%150==0){

var obstacle=createSprite(400,330,20,40);
obstacle.addImage(Curry1);
obstacle.scale=0.6;
obstacle.velocityX=-4;
obstacle.lifetime=100;
Obstaclegroup.add(obstacle);
}
}
