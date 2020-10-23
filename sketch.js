var particles = [];
function setup() {
 createCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  var p = new Particle(mouseX, mouseY, random(1, 8));
  particles.push(p);
}

function keyPressed(){
  if(key == ' '){
    particles.splice(0, 1);
  } 
}

function draw() {
  background(0);
  
  var wind = createVector(0.1, 0);
  
  for(var i = 0; i < particles.length; i++){
     var gravity = createVector(0, 0.2*particles[i].mass);
     particles[i].applyForce(gravity);
     
     if(mouseIsPressed){
        particles[i].applyForce(wind); 
      }
      
      particles[i].update();
      particles[i].edges();
      particles[i].display();      
  }   
}

function Particle(x, y, m){
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;
  
  
  this.applyForce = function(force){
    var f = force.copy(); //Aceleração = Massa/Força
    f.div(this.mass);
    this.acc.add(f); //A força produz uma aceleração 
  }
  
  this.update = function(){
    this.vel.add(this.acc); //A aceleração muda a velocidade
    this.pos.add(this.vel); //A velocidade muda a posição
    
    this.acc.set(0, 0);
  }
  
  this.display = function(){
    fill(0, 100, 255, 100);
    ellipse(this.pos.x, this.pos.y, this.mass * 10, this.mass * 10);
  }
  
  this.edges = function(){
      if(this.pos.y > height){
        this.vel.y *= -1;
        this.pos.y = height;
    }
    
     if(this.pos.x > width){
        this.vel.x *= -1;
        this.pos.x = width;
    }  
  }
}
