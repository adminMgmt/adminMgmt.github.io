document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var container = document.getElementById('wrap');
sizing();

function sizing(){
    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
}

var i = 0;
var state = 0;
var button = false;
const timeLimit = 20000;
var oldTime = Date.now();
var enemy = [];
//var ballRadius = 30;
var fighterW = 50;
var fighterH = 80;
var missileRadius = 20;
var missileHeight = 70;
var numOfBall = 10;
var count = 0;
var gameResult;
//var imageSize = 50;

function drawImage(x, y){
    var img = new Image();
    img.src = 'fighter.png'; 
    img.onload = function(){
        ctx.drawImage(img, x, y, 50, 50);
    }
}

class Missile{
    constructor(){
        this.x = canvas.width / 2;
        // this.y = canvas.height - missileRadius;
        this.y = canvas.height - missileHeight;
        this.visible = true;
    }
    setPos(x){
        this.x = x;
        // this.y = canvas.height - missileRadius;
        this.y = canvas.height - missileHeight;
    }
    move(){
        this.y -= 5;
    }
    draw(){
        if(this.visible){
            /*
            ctx.beginPath();
            ctx.arc(this.x, this.y, missileRadius, 0, Math.PI*2);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();
            */
            drawMissile(this.x, this.y);
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
        /*
        if(this.x < ballRadius) this.xSpeed *= -1;
        if(this.y < ballRadius) this.ySpeed *= -1;
        if(this.x > canvas.width-ballRadius) this.xSpeed *= -1;
        if(this.y> canvas.height-ballRadius) this.ySpeed *= -1;
        */
        if(this.x < fighterW) this.xSpeed *= -1;
        if(this.y < fighterH) this.ySpeed *= -1;
        if(this.x > canvas.width-fighterW) this.xSpeed *= -1;
        if(this.y> canvas.height-fighterH) this.ySpeed *= -1;
    }
    isHit(missileX, missileY){
        /*
        if(!this.visible || (Math.abs(this.x-missileX) < missileRadius + ballRadius && Math.abs(this.y-missileY) < missileRadius + ballRadius)){
            this.visible = false;
            return true;
        }else{
            return false;
        }
        */
        if(!this.visible || (Math.abs(this.x-missileX) < missileRadius + fighterW && Math.abs(this.y-missileY) < missileRadius + fighterH)){
            this.visible = false;
            return true;
        }else{
            return false;
        }
    }
    draw(){
        if(this.visible){
            //drawImage(this.x, this.y);
            /*
            ctx.beginPath();
            ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            */
            drawFighter(this.x, this.y);
        }
    }
}

var missile = new Missile();

canvas.addEventListener('touchstart', function(e){
    if (event.targetTouches.length == 1) {
        var rect = e.target.getBoundingClientRect();
        var touch = e.touches[0];
        missile.setPos(touch.clientX - rect.left);
        button = true;
    }
}, false);

function createEnemies(){
    for(i = 0; i<numOfBall; i++){
        //enemy[i] = new Enemy(Math.random() * (canvas.width-2*ballRadius)+ballRadius, Math.random() * (canvas.height-2*ballRadius)+ballRadius, Math.random() * 3, Math.random() * 3);
        enemy[i] = new Enemy(Math.random() * (canvas.width-2*fighterW)+fighterW, Math.random() * (canvas.height-2*fighterH)+fighterH, Math.random() * 3, Math.random() * 3);
    }
}

function drawTimeLimit(remainSec){
    ctx.font = "60px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "left";
    ctx.fillText("TimeLimit: " + remainSec, 5, 50);
}

function drawMissile(x, y){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 10, y + 25);
    ctx.lineTo(x - 10, y + 70);
    ctx.lineTo(x + 10, y + 70);
    ctx.lineTo(x + 10, y + 25);
    ctx.lineTo(x, y);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawFighter(x, y){
    /*
    ctx.beginPath();
    ctx.moveTo(x - 50, y - 80);
    ctx.lineTo(x + 50, y - 80);
    ctx.lineTo(x + 50, y + 80);
    ctx.lineTo(x - 50, y + 80);
    ctx.lineTo(x - 50, y - 80);
    ctx.strokeStyle = "#0095DD";
    ctx.stroke();
    ctx.closePath();
    */

    ctx.beginPath();
    ctx.moveTo(x, y - 80);
    ctx.lineTo(x - 5, y - 70);
    ctx.lineTo(x - 5, y - 55);
    ctx.lineTo(x - 10, y - 45);
    ctx.lineTo(x - 10, y - 10);
    ctx.lineTo(x - 48, y + 20);
    //
    ctx.lineTo(x - 48, y);
    ctx.lineTo(x - 50, y);
    ctx.lineTo(x - 50, y + 50);
    ctx.lineTo(x - 48, y + 50);
    //
    ctx.lineTo(x - 48, y + 40);
    ctx.lineTo(x - 10, y + 40);
    ctx.lineTo(x - 10, y + 50);
    ctx.lineTo(x - 25, y + 65);
    ctx.lineTo(x - 25, y + 75);
    ctx.lineTo(x - 10, y + 75);
    ctx.lineTo(x - 7, y + 60);
    ctx.lineTo(x - 5, y + 60);
    ctx.lineTo(x - 3, y + 80);
    //----------------------------
    ctx.lineTo(x + 3, y + 80);
    ctx.lineTo(x + 5, y + 60);
    ctx.lineTo(x + 7, y + 60);
    ctx.lineTo(x + 10, y + 75);
    ctx.lineTo(x + 25, y + 75);
    ctx.lineTo(x + 25, y + 65);
    ctx.lineTo(x + 10, y + 50);
    ctx.lineTo(x + 10, y + 40);
    ctx.lineTo(x + 48, y + 40);
    //
    ctx.lineTo(x + 48, y + 50);
    ctx.lineTo(x + 50, y + 50);
    ctx.lineTo(x + 50, y);
    ctx.lineTo(x + 48, y);
    //
    ctx.lineTo(x + 48, y + 20);
    ctx.lineTo(x + 10, y - 10);
    ctx.lineTo(x + 10, y - 45);
    ctx.lineTo(x + 5, y - 55);
    ctx.lineTo(x + 5, y - 70);
    
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function GameStart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "60px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Game Start", canvas.width / 2, canvas.height / 2);
    if(button){
        button = false;
        state = 1;
        count = 0;
        createEnemies();
        oldTime = Date.now();
    }
}

function GameScreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i<numOfBall; i++){
        enemy[i].move();
        enemy[i].draw();
        if(enemy[i].isHit(missile.x, missile.y)){
            count++;
        }
    }
    missile.move();
    missile.draw();
    const remainMSec = timeLimit - Date.now() + oldTime;
    const remainSec = (remainMSec / 1000).toFixed(2);
    if(remainSec > 0){
        drawTimeLimit(remainSec);
    }else{
        state = 2;
        gameResult = false;
        button = false;
    }
    if(count == numOfBall){
        state = 2;
        gameResult = true;
        button = false;
    }
    count = 0;
}

function GameEnd(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(gameResult){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Sucessed", canvas.width / 2, canvas.height / 2);
    }else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Failed", canvas.width / 2, canvas.height / 2);
    }
    if(button){
        state = 0;
        button = false;
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

setInterval(draw, 10);
