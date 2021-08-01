let animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

let canvas = document.createElement('canvas');
let width = 600;
let height = 400;
canvas.width = width;
canvas.height = height;
let context = canvas.getContext('2d');

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};

let step = function() {
    update();
    render();
    animate(step);
};

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function() {
    context.fillStyle = "#0000FF";
    context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
    this.paddle = new Paddle(575, 180, 10, 50);
}

function Computer() {
    this.paddle = new Paddle(25, 180, 10, 50);
}
Player.prototype.render = function() {
    this.paddle.render();
};

Computer.prototype.render = function() {
    this.paddle.render();
};
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 3;
    this.y_speed = 0;
    this.radius = 5;
}

Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
};
let player = new Player();
let computer = new Computer();
let ball = new Ball(300, 200);

let render = function() {
    context.fillStyle = "#99FFFF";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
};
let update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
};
Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    let left_x = this.x - 5;
    let left_y = this.y - 5;
    let right_x = this.x + 5;
    let right_y = this.y + 5;

    if(this.x - 5 < 0) { // hitting the left wall
        this.x = 5;
        this.x_speed = -this.x_speed;
    } else if(this.x + 5 > 600) { // hitting the right wall
        this.x = 595;
        this.x_speed = -this.x_speed;
    }

    if(this.y < 0 || this.y > 400) { // a point was scored
        this.x_speed = 3;
        this.y_speed = 0;
        this.x = 300;
        this.y = 200;
    }

    if(left_y < 300) {
        if(left_y < (paddle1.y + paddle1.height) && right_y > paddle1.y && left_x < (paddle1.x + paddle1.width) && right_x > paddle1.x) {
            // hit the player's paddle
            this.y_speed = -3;
            this.x_speed += (paddle1.x_speed / 2);
            this.y += this.y_speed;
        }
    } else {
        if(left_y < (paddle2.y + paddle2.height) && right_y > paddle2.y && left_x < (paddle2.x + paddle2.width) && right_x > paddle2.x) {
            // hit the computer's paddle
            this.x_speed = 3;
            this.y_speed += (paddle2.y_speed / 2);
            this.x += this.x_speed;
        }
    }
};
let keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});
Player.prototype.update = function() {
    for(let key in keysDown) {
        let value = Number(key);
        if(value === 38) { // up arrow
            this.paddle.move(0, -4);
        } else if (value === 40) { // down arrow
            this.paddle.move(0, 4);
        } else {
            this.paddle.move(0, 0);
        }
    }
};

Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x < 0) { // all the way to the left
        this.x = 0;
        this.x_speed = 0;
    } else if (this.x + this.height > 625) { // all the way to the right
        this.x = 625 - this.height;
        this.x_speed = 0;
    }
};
Computer.prototype.update = function(ball) {
    let x_pos = ball.x;
    let diff = +((this.paddle.y + (this.paddle.height / 2)) - x_pos);
    if(diff < 0 && diff < -4) { // max speed left
        diff = 5;
    } else if(diff > 0 && diff > 4) { // max speed right
        diff = -5;
    }
    this.paddle.move(diff, 0);
    if(this.paddle.x < 25) {
        this.paddle.x = 25;
    } else if (this.paddle.x + this.paddle.height > 25) {
        this.paddle.x = 25 - this.paddle.height;
    }
};