function Bar(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#DF0101";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.closePath();
        ctx.fill();
    }

    this.moveLeft = function () {
        this.x -= 10;
    }

    this.moveRight = function () {
        this.x += 10;
    }
}

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#003300";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }

    this.moveX = function (speed) {
        this.x += speed;
    }

    this.moveY = function (speed) {
        this.y += speed;
    }
}

function GameBoard(width, height){
    this.width = width;
    this.height = height;
}

    let canvas = document.getElementById("game");
    let ctx = canvas.getContext('2d');
    let speedX = 2;
    let speedY = 2;
    let gameBoard = new GameBoard(800,600);
    let bar = new Bar(370, 500, 60, 10);
    let circle = new Circle(400, 490, 10);
    let timer, scorer;
    let gameSpeed = 10;
    let score = 0;


    function doKeyDown(e) {
        switch (e.keyCode) {
            case 37:
                if(bar.x >= 10)
                    bar.moveLeft();
                break;
            case 39:
                if(bar.x < gameBoard.width-bar.width)
                    bar.moveRight();
                break;
        }
    }

    function init(){
        window.addEventListener("keydown", this.doKeyDown, false);
        timer = setInterval(draw, gameSpeed);
        scorer = setInterval(setScore,1000);
        //increaseSpeed();
    }

    // function increaseSpeed() {
    //     gameSpeed *= 1000 / score;
    // }

    function setScore() {
        score += 100;
        document.getElementById("score").value = ""+score;
    }

    function checkTouch() {
        if (circle.x + circle.radius >= gameBoard.width || circle.x - circle.radius <= 0)
            speedX *= -1;
        if (circle.y  + circle.radius >= bar.y && circle.x > bar.x && circle.x < bar.x + bar.width)
            speedY *= -1;
        if (circle.y  + circle.radius > gameBoard.height || circle.y - circle.radius < 0)
            speedY *= -1;
    }

    function checkGameOver() {
        return circle.y + circle.radius > bar.y + bar.height;
    }

    function gameOver() {
        clearInterval(timer);
        clearInterval(scorer);
        ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
        alert("Game Over");
    }

    function draw() {
        if(checkGameOver())
            gameOver();
        else {
            ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
            ctx.fillStyle = "#FAF7F8";
            ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
            circle.draw(ctx);
            checkTouch();
            circle.moveX(speedX);
            circle.moveY(speedY);
            bar.draw(ctx);
        }
}


