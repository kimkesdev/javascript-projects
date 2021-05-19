class Shot {
 constructor(x, y, speed) {
   this.x = x
   this.y = y
   this.speed = speed
 }
 move() {
   this.y -= this.speed
 }
 show() {
   fill("white")
   rect(this.x,this.y, 3, 10)
 }
 didHit(object) {
   if(this.x > object.x && this.x < object.x + object.width &&
      this.y > object.y && this.y < object.y + object.height) {
        this.y = -10
        return true
   } // end  if(shot....)
   return false
 } // end didHit(alien)
}