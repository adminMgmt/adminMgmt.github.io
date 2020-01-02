document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var i = 0;
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
    // If there's exactly one finger inside this element
    if (event.targetTouches.length == 1) {
        var rect = e.target.getBoundingClientRect();
        var touch = e.touches[0];
      bullet.setPos(touch.clientX - rect.left);
      console.log(bullet.x);
    }
  }, false);


for(i = 0; i<numOfBall; i++){
    enemy[i] = new Enemy(Math.random() * (canvas.width-2*ballRadius)+ballRadius, Math.random() * (canvas.height-2*ballRadius)+ballRadius, Math.random() * 3, Math.random() * 3);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i<numOfBall; i++){
        enemy[i].move();
        enemy[i].draw();
    }
    bullet.move();
    bullet.draw();
    //console.log(bullet.y);
}

var interval = setInterval(draw, 10);