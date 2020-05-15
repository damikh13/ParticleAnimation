window.onload = function () {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let h = (canvas.height = innerHeight);
  let w = (canvas.width = innerWidth);
  let particles = [];
  let properties = {
    particleVelocity: +prompt("velocity?", 0.5),
    bgColor: 'rgba(17, 17, 18, 1)',
    particleRadius: 3,
    particleColor: 'rgba(255, 40, 40, 1)',
    particlesCount: +prompt("particlesCount?", 60),
    minLength: +prompt("length?", 150),
    particleLifeTime: 6,
    divideOpacityBy: +prompt("divide opacity by?", 1),
    lineWidth: "0,5",
  };

  window.onresize = function () {
    h = canvas.height = innerHeight;
    w = canvas.width = innerWidth;
  };
  document.querySelector("body").appendChild(canvas);
  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.velocityX =
        Math.random() * properties.particleVelocity * 2 -
        properties.particleVelocity;
      this.velocityY =
        Math.random() * properties.particleVelocity * 2 -
        properties.particleVelocity;
      this.life = properties.particleLifeTime  * 60;
      this.life = properties.particleLifeTime * Math.random() * 60;
    }

    position() {
      (this.x + this.velocityX > w && this.velocityX > 0) ||
      (this.x + this.velocityX < 0 && this.velocityX < 0)
        ? (this.velocityX *= -1)
        : this.velocityX;
      (this.y + this.velocityY > h && this.velocityY > 0) ||
      (this.y + this.velocityY < 0 && this.velocityY < 0)
        ? (this.velocityY *= -1)
        : this.velocityY;
      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    reCalculateTimeLife() {
      if (this.life < 1) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX =
          Math.random() * properties.particleVelocity * 2 -
          properties.particleVelocity;
        this.velocityY =
          Math.random() * properties.particleVelocity * 2 -
          properties.particleVelocity;
        this.life = properties.particleLifeTime * Math.random() * 60;
      }
      this.life--;
    }

    drawParticle() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
  }

  function reDrawBackground() {
    ctx.fillStyle = properties.bgColor;
    ctx.fillRect(0, 0, w, h);
  }

  function reDrawParticles() {
    for (let i in particles) {
      particles[i].position();
      // particles[i].reCalculateTimeLife();
      particles[i].drawParticle();
    }
  }

  function drawLines() {
    let x1, x2, y1, y2, length, opacity;
    for (let i in particles) {
      for (let j in particles) {
        x1 = particles[i].x;
        x2 = particles[j].x;
        y1 = particles[i].y;
        y2 = particles[j].y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (length < properties.minLength) {
          opacity = (1 - length / properties.minLength) / properties.divideOpacityBy;
          ctx.lineWidth = properties.lineWidth;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.strokeStyle = `rgba(255, 40, 40, ${opacity})`;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    reDrawBackground();
    reDrawParticles();
    drawLines();
    window.requestAnimationFrame(loop);
  }

  function init() {
    for (let i = 0; i < properties.particlesCount; i++) {
      particles.push(new Particle());
    }
    loop();
  }

  init();
};
