var particles = [];
var nums =300;
var noiseScale = 999;
var time = 0;

var colors = []; 

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(255,20,0);
	 
	 
  colors.push("#ff000550");
  colors.push("#ff200420");
  colors.push("#ff252625");
  colors.push("#ff023059");
}

function draw(){
	stroke(random(colors));
	time += 0.000001;
	 blendMode(SCREEN);
	for(var i = 0; i < particles.length; i++){
		for(var j = 0; j < 200; j++){
			particles[i].move();
			particles[i].display();
			particles[i].checkEdge();
		
		}
	}  
}

function mousePressed(){
	particles.push(new Particle(mouseX, mouseY, random(1, 5)));
	 
}


function Particle(x, y, radius){
	this.radius = radius;
	this.dir = createVector(0, 0);
	this.vel = createVector(0, 0);
	this.pos = createVector(x, y);
	this.prevPos = createVector(x, y);
	this.speed = 0.2;

	this.move = function(){
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale, time)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	this.checkEdge = function(){
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.pos.x = random(200, width);
			this.pos.y = random(100, height);
		}
	}

	this.display = function(r){
		strokeWeight(this.radius);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
	}
}