document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var container = document.getElementById('wrap');
sizing();
  
function sizing() {
    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
}

var i = 0;
var state = 0;
var button = false;
const timeLimit = 20000;
var oldTime = Date.now();
var enemy = [];
var ballRadius = 30;
var bulletRadius = 30;
var numOfBall = 10;
//var imageSize = 50;

function drawImage(x, y)
{
    var img = new Image();
    img.src = 'fighter.png'; 
    img.onload = function(){
        ctx.drawImage(img, x, y, 50, 50);
    }
}

class Bullet{
    constructor(){
        this.x = canvas.width / 2;
        this.y = canvas.height - bulletRadius;
        this.visible = true;
    }
    setPos(x){
        this.x = x;
        this.y = canvas.height - bulletRadius;
    }
    move(){
        this.y -= 5;
    }
    draw(){
        if(this.visible){
            ctx.beginPath();
            ctx.arc(this.x, this.y, bulletRadius, 0, Math.PI*2);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();
        }
    }
}

class Enemy{
    constructor(x, y, xSpeed, ySpeed){
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.visible = true;
    }
    move(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if(this.x < ballRadius) this.xSpeed *= -1;
        if(this.y < ballRadius) this.ySpeed *= -1;
        if(this.x > canvas.width-ballRadius) this.xSpeed *= -1;
        if(this.y> canvas.height-ballRadius) this.ySpeed *= -1;
    }
    isHit(bulletX, bulletY){
        if(!this.visible || (Math.abs(this.x-bulletX) < bulletRadius + ballRadius && Math.abs(this.y-bulletY) < bulletRadius + ballRadius)){
            this.visible = false;
            return true;
        }else{
            return false;
        }
    }
    draw(){
        if(this.visible){
            //drawImage(this.x, this.y);
            ctx.beginPath();
            ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

var bullet = new Bullet();

canvas.addEventListener('touchstart', function(e) {
    if (event.targetTouches.length == 1) {
        var rect = e.target.getBoundingClientRect();
        var touch = e.touches[0];
        bullet.setPos(touch.clientX - rect.left);
        button = true;
    }
}, false);

for(i = 0; i<numOfBall; i++){
    console.log(i + 'Creat a object');
    enemy[i] = new Enemy(Math.random() * (canvas.width-2*ballRadius)+ballRadius, Math.random() * (canvas.height-2*ballRadius)+ballRadius, Math.random() * 3, Math.random() * 3);
}

function drawTimeLimit(remainSec){
    ctx.font = "38px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "left";
    ctx.fillText("TimeLimit: " + remainSec, 5, 30);
    
}

function GameStart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Game Start", canvas.width / 2, canvas.height / 2);
    if(button){
        console.log('state 1');
        button = false;
        state = 1;
        count = 0;
        oldTime = Date.now();
    }
}
var count = 0;
var gameResult;

function GameScreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i<numOfBall; i++){
        enemy[i].move();
        enemy[i].draw();
        if(enemy[i].isHit(bullet.x, bullet.y)){
            count++;
            console.log(count);
        }
    }
    bullet.move();
    bullet.draw();
    const remainMSec = timeLimit - Date.now() + oldTime;
    const remainSec = (remainMSec / 1000).toFixed(2);
    if(remainSec > 0){
        drawTimeLimit(remainSec);
    }else{
        state = 2;
        gameResult = false;
    }
    if(count == numOfBall){
        state = 2;
        gameResult = true;
    }
    count = 0;
}

function GameEnd(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(gameResult){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Sucessed", canvas.width / 2, canvas.height / 2);
    }else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Failed", canvas.width / 2, canvas.height / 2);
    }
    if(button){
        location.reload();
    }
}

function draw(){
    switch(state){
        case 0:
            GameStart();
            break;
        case 1:
            GameScreen();
            break;
        case 2:
            GameEnd();
            break;
    }
}

var interval = setInterval(draw, 10);