// set up canvas

const para = document.querySelector('p');
let count = 0;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Base Shape class that all shapes (balls, evil circle) inherit from
class Shape {

    constructor(x, y, velX, velY) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
    }
  
  }
  
  // Ball class, inherits from Shape
  class Ball extends Shape {

    constructor(x, y, velX, velY, color, size) {
      super(x, y, velX, velY);
  
      this.color = color;
      this.size = size;
      this.exists = true;
    }

  // Draw the ball on the canvas
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Update ball's position and handle boundaries
  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // Collision detection between balls
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}
// EvilCircle class, inherits from Shape, controlled by the user
class EvilCircle extends Shape {

    constructor(x, y) {
        super(x, y, velX, velY);
  
      this.color = "white";
      this.size = 10;

      // Event listener for user input (moving the evil circle with arrow keys)
      window.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'a':
            this.x -= this.velX;
            break;
          case 'd':
            this.x += this.velX;
            break;
          case 'w':
            this.y -= this.velY;
            break;
          case 's':
            this.y += this.velY;
            break;
        }
      });
    }
    // Draw the evil circle on the canvas
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Prevent the evil circle from going out of bounds
    checkBounds() {
        if ((this.x + this.size) >= width) {
          this.x -= this.size;
        }
    
        if ((this.x - this.size) <= 0) {
          this.x += this.size;
        }
    
        if ((this.y + this.size) >= height) {
          this.y -= this.size;
        }
    
        if ((this.y - this.size) <= 0) {
          this.y += this.size;
        }
    }
    
    // Collision detection between the evil circle and other balls 
    collisionDetect() {
        for (const ball of balls) {
          if (ball.exists) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < this.size + ball.size) {
              ball.exists = false;
              count--;
              para.textContent = 'Ball count: ' + count;
            }
          }
        }
      }
    
    }
    
// Array to store all balls/
const balls = [];

// Create 25 random balls
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  count++;
  para.textContent = 'Ball count: ' + count;
}

// Create the evil circle
const evilBall = new EvilCircle(random(0, width), random(0, height));

// Main loop to update the canvas and animate the balls and evil circle
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

   // Draw and update all balls
  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  requestAnimationFrame(loop);
}
// Start the animation loop
loop();
