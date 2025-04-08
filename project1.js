

/*  
Notice that all my variable names have been changed
and even the way I wrote the code has also been changed
I've done that because I noticed that my whole code was messed up
and was messy and it was really hard for me to match the 
x and y coords of the dog and bird.
This code is much easier now to make modifications 
to it.

*/

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let display = document.getElementById("output");

let alive = false;
let caught = 0;
let speed = 10;
let dogSpeed = 5;

let bird = new Image();
bird.src = "wildBird.png";

let dog = new Image();
dog.src = "blackDog.png";

let background = new Image();
background.src = "background.jpg";


let birdCoords = {
    x: 0,
    y: 0
};

let dogCoords = {
    x: 0,
    y: canvas.height - 130
};


let rightButton = document.getElementById("right");
rightButton.onclick = moveRight;
function moveRight() {
    if (dogCoords.x + 25 <= canvas.width - 10) {

        dogCoords.x += 25;
    }

}


let leftButton = document.getElementById("left");
leftButton.onclick = moveLeft;
function moveLeft() {
    if (dogCoords.x - 50 >= 0) {


        dogCoords.x -= 25;
    }

}

document.addEventListener("keydown", updateDog);
function updateDog(event) {
    if (event.code == "ArrowRight" && dogCoords.x + dogSpeed <= canvas.width - 28) {
        dogCoords.x += dogSpeed;
    }
    if (event.code == "ArrowLeft" && dogCoords.x - dogSpeed >= 35) {
        dogCoords.x -= dogSpeed;
    }
}

function drawBird() {
    bird.onload = drawBird;
    ctx.drawImage(bird, birdCoords.x - (48 / 2), birdCoords.y - (55 / 2), 48, 55);
}

function drawDog() {
    dog.onload = drawDog;
    ctx.drawImage(dog, dogCoords.x - 98, dogCoords.y - 20, 153, 153);
}

function updateBird(x, y) {
    birdCoords.x = x;
    birdCoords.y = y;
}

// from dog.x - (98/2) aka dog half width to dog x
function simulateBird() {
    birdCoords.y += speed;
    // if bird is off screen
    if (birdCoords.y > canvas.height + 55) {
        alive = false;
    } else if (birdCoords.x > dogCoords.x - (98 / 2) && birdCoords.x < dogCoords.x && birdCoords.y + 25 > dogCoords.y - 4) {
        alive = false;
        updateGame();
    }
}

function spawnBird() {
    const min = 48;
    const max = canvas.width - 48;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    updateBird(randomNumber, -60);
}

// update game stats when dog eats bird
function updateGame() {


    caught += 1;
    if (caught <= 10) {

        display.innerHTML = caught;


    } else {
        clearInterval(update);
        caught = 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        birdCoords = { x: -25, y: 0 };
        dogCoords = { x: -30, y: canvas.height - 130 };
        ctx.beginPath();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "90px Georgia";
        ctx.strokeStyle = "Yellow";

        // ctx.textAlign = "center";
        ctx.strokeText("You Win!", 130, 200);

    }




    // I decided to speed up the bird so the game can be harder as the bird gets caught
    if (speed < 27) {
        speed += 1;
    }

    if (dogSpeed < 12) {
        dogSpeed += 1;
    }
}


function clearRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.onload = clearRect;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}






//     let update = setInterval(() => {
//         // spawn bird
//     if (alive == false) {
//         spawnBird();
//         drawBird();
//         alive = true;
//     }
//     clearRect();
//     simulateBird();
//     drawDog();
//     drawBird();
// }, 100);





let update;
function executeMove() {

    // spawn bird
    if (alive == false) {
        spawnBird();
        drawBird();
        alive = true;
    }
    clearRect();
    simulateBird();
    drawDog();
    drawBird();


}
window.onload = function () {
    executeMove();
};
// executeMove();

// you need to hit start to see the dog and to see the bird moving
let sButton = document.getElementById("start");

sButton.addEventListener("click", function () {

    if (typeof update == "undefined") {
        update = setInterval(executeMove, 100);
    }

})









let stButton = document.getElementById("stop");
stButton.onclick = stopButton;
function stopButton() {
    clearInterval(update);
    update = undefined;

}