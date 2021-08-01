// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed  = Math.floor(Math.random()* 500);

    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x >= 510) {
            this.x = -50;
        }
        if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
            player.x = 202;
            player.y = 405;
            restart();
        };
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}



// Now write your own player class
class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }
// This class requires an update(), render() and
    update (x, y) {
        if (this.x >= 405) {
            this.x = 400;
        } else if (this.x <= -1) {
            this.x = 0;
        } else if (this.y >= 400) {
            this.y = 400;
        } else if (this.y <= -20) {
            this.x = 200;
            this.y = 400;
            gameWon();
            
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
// a handleInput() method.
    handleInput(moves) {
        switch(moves) {
            case 'up': this.update(this.y -= 85);
            break;
            case 'down': this.update(this.y += 85);
            break;
            case 'right': this.update(this.x += 100);
            break;
            case 'left': this.update(this.x -= 100);
            break;
        }

    }
}

// Display Modal if player won!.
function modal() {
    const modal = document.getElementById('endGame');
    modal.classList.add('appear');
    
}

// Gamewon function handle winning process if play won!.
function gameWon() {
    modal();
    const playAgain = document.querySelector('.button');
    playAgain.addEventListener('click', function() {
        restart();
    const modal = document.getElementById('endGame');
            modal.classList.remove('appear');
            
        }); 
    
}
// reload game.
function restart() {
    location.reload();
}
// Now instantiate your objects.
const enemyOne = new Enemy (0, 60);
const enemyTwo = new Enemy (0, 145);
const enemyThree = new Enemy (0, 227);
const enemyFour = new Enemy (0, 310);
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];
// Place the player object in a variable called player
const player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});