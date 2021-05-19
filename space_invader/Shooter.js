class Shooter  {
  constructor() {
    this.x = width/2
    this.y = height-30
    this.width = 25
    this.height = 25
    this.shotFired = false
    this.speed = 5
    this.shot = new Shot(this.x, this.y, 5);
  }
  update() {
    if(right_key_is_held) {
      this.x -= this.speed
    } else if(left_key_is_held) {
       this.x += this.speed
    }
    if(this.x < 5) {
      this.x = 5
    } else if(this.x > width - this.width - 5) {
      this.x = width - this.width - 5
    }
    if(this.shotFired) {
      this.shot.move()
    }
    if(this.shot.y < 0) {
      this.shotFired = false
    }
  }
  show() {
    if(this.shotFired) {
      this.shot.show()
    }
    fill('red')
    rect(this.x, this.y, 25,25)
  }
  shoot() {
    if(this.shotFired) { return }
    this.shotFired = true
    this.shot.x = this.x
    this.shot.y = this.y
  }
}