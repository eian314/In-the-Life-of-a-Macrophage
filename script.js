let macrophage;
let bacteria = [];
let numBacteria = 10;
let gameState = 0;
let timer = 30;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('game-container');
    macrophage = new Macrophage();
    for (let i = 0; i < numBacteria; i++) {
        bacteria.push(new Bacterium());
    }
    setInterval(() => {
        if (gameState === 1 && timer > 0) {
            timer--;
        }
    }, 1000);
}

function draw() {
    background(220);
    if (gameState === 0) {
        showStartScreen();
    } else if (gameState === 1) {
        playGame();
    } else if (gameState === 2) {
        showWinScreen();
    } else if (gameState === 3) {
        showLoseScreen();
    }
}

function showStartScreen() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text('In the Life of a Macrophage', width / 2, height / 2 - 50);
    text('Press ENTER to Start', width / 2, height / 2);
}

function playGame() {
    macrophage.move();
    macrophage.show();
    for (let i = bacteria.length - 1; i >= 0; i--) {
        bacteria[i].move();
        bacteria[i].show();
        if (macrophage.eats(bacteria[i])) {
            bacteria.splice(i, 1);
        }
    }
    showTimer();
    if (bacteria.length === 0) {
        gameState = 2;
    } else if (timer === 0) {
        gameState = 3;
    }
}

function showWinScreen() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text('You Win!', width / 2, height / 2 - 50);
    text('Press ENTER to Play Again', width / 2, height / 2);
}

function showLoseScreen() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text('You Lose!', width / 2, height / 2 - 50);
    text('Press ENTER to Play Again', width / 2, height / 2);
}

function showTimer() {
    textSize(32);
    textAlign(LEFT, TOP);
    text(`Time: ${timer}`, 10, 10);
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (gameState === 0 || gameState === 2 || gameState === 3) {
            resetGame();
        }
    }
}

function resetGame() {
    gameState = 1;
    timer = 30;
    bacteria = [];
    for (let i = 0; i < numBacteria; i++) {
        bacteria.push(new Bacterium());
    }
}

class Macrophage {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.size = 50;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += 5;
        }
        if (keyIsDown(UP_ARROW)) {
            this.y -= 5;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.y += 5;
        }
    }

    show() {
        fill(0, 255, 0);
        ellipse(this.x, this.y, this.size);
    }

    eats(bacterium) {
        let d = dist(this.x, this.y, bacterium.x, bacterium.y);
        if (d < this.size / 2 + bacterium.size / 2) {
            return true;
        } else {
            return false;
        }
    }
}

class Bacterium {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = 30;
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-2, 2);
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.size);
    }
}
