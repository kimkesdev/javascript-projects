class Alien {
  constructor(x,y) {
    this.x = x
    this.y  = y
    this.width = 30
    this.height  = 30
    this.baseSpeed = 0.5
    this.maxSpeed = 15
    this.isAlive = true
  }
  move(alienCount) {
    if(this.x > width - 40 || this.x < 5) {
      this.baseSpeed *= -1
      this. y += 25
    }
      this.x += this.baseSpeed * this.maxSpeed/alienCount
  }
  show() {
    fill("green")
    rect(this.x , this.y , this.width, this.height)
  }
  didHit(object) {
    if(this.x > object.x && this.x < object.x + object.width &&
       this.y > object.y && this.y < object.y + object.height) {
         return true
    } // end  if(shot....)
    return false
  } // end didHit(alien)
} // end class Alien