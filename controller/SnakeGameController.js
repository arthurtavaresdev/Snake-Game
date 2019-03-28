const stage = document.getElementById('stage');
const ctx = stage.getContext("2d");
document.addEventListener("keydown", keyPush);
let inter = setInterval(game, 80);

const vel = 1;

let vx = vy = 0;
let px = 10;
let py = 15;
let tp = 30;
let qp = 20;
let ax = ay = 15;
let lastKey = 0;

const trail = [];
tail = 5;

function game() {

    overtakeWall();
    drawAll();



    trail.push({
        x: px,
        y: py
    })

    positionApple();

    while (trail.length >= tail) {
        trail.shift();
    }

}



function overtakeWall() {
    px += vx;
    py += vy;
    if (px < 0) {
        px = qp - 1;
    }
    if (px > qp - 1) {
        px = 0;
    }
    if (py < 0) {
        py = qp - 1;
    }
    if (py > qp - 1) {
        py = 0;
    }
}


function drawAll() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);


    increaseSnake();

}

function increaseSnake(){

    ctx.fillStyle = "gray";
    for (let i = 0; i < trail.length; i++) {

        ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);

        if (trail[i].x == px && trail[i].y == py) {
            gameOver();
        }
    }
}



function gameOver() {
    if (trail.length > 5) {
        clearInterval(inter);
        let message = "Fim de jogo"; //Define a mensagem
        ctx.font = '50pt Arial'; //Define Tamanho e fonte
        ctx.fillStyle = 'White'; //Define a cor
        ctx.fillText(message, 130, 300); //Desenha a mensagem
    };

}

function positionApple() {

    ctx.fillStyle = "red";
    ctx.fillRect(ax * tp, ay * tp, tp, tp);

    if (ax == px && ay == py) {
        tail++;
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
    }
}

function keyPush(event) {

    console.log(lastKey);

    if (event.keyCode == 37 && lastKey != 39) {
        vx = -vel; // Left
        vy = 0;
    } else if (event.keyCode == 38 && lastKey != 40) {
        vx = 0; // up
        vy = -vel;

    } else if (event.keyCode == 39 && lastKey != 37) {
        vx = vel; // right
        vy = 0;
    } else if (event.keyCode == 40 && lastKey != 38) {
        vx = 0; // down
        vy = vel;
    }

    lastKey = event.keyCode;




}