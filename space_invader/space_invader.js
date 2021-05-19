var shooter
var aliens
var alienCount
var alienShotFired
var alienShot
function setup() {
  createCanvas(600,600)
  reset()
}
function reset() {
  shooter = new Shooter()
  aliens = []
  alienCount = 0
  alienShotFired = false
  alienShot = new Shot(-10, -10, 0)
  for(var rows=0; rows<5; rows++) {
    row = []
    for(var cols=0; cols<3; cols++) {
      row.push(new Alien(rows * 50 + 100, cols * 40 + 20 ))
      alienCount ++
    }
    aliens.push(row)
  }
  console.log(aliens)
}
function draw() {
  background(51)
  shooter.update()
  shooter.show()
  for(var rows=0; rows<5; rows++) {
    for(var cols=0; cols<3; cols++) {
      updateAlien(aliens[rows][cols])
    } // end for cols
  } // end for rows
  if(alienShotFired) {
    if(alienShot.y > height) {
      alienShotFired = false
    }
    alienShot.move()
    alienShot.show()
    if(alienShot.didHit(shooter)) {
      reset()
    }
  }
} // end draw()

function updateAlien(alien) {
  if(alien.isAlive) {
    if(shooter.shotFired && shooter.shot.didHit(alien) ) {
      alien.isAlive = false
      alienCount --
    } // end if shot
    alienShotHandling(alien)
    alien.move(alienCount)
    alien.show()
    if(alienCount <= 0 || alien.y > height - 30) { reset() }
  } // end if alive
}
function alienShotHandling(alien) {
  if(alienShotFired == false &&
     dist(alien.x,0 ,shooter.x,0) < 50 &&
     Math.random() > .99) {
    console.log('shotting')
    alienShotFired = true
    alienShot = new Shot(alien.x, alien.y, -5)
  }
}

// MOUSE HANDLING
var right_key_is_held = false
var left_key_is_held = false

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    right_key_is_held = true
  } else if (keyCode === RIGHT_ARROW) {
    left_key_is_held = true
  } else if (keyCode === UP_ARROW) {
    shooter.shoot()
  }
}
function keyReleased() {
  if(keyCode === LEFT_ARROW) {
    right_key_is_held = false
  } else if (keyCode === RIGHT_ARROW) {
    left_key_is_held = false
  }
}