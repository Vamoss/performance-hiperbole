/******************
Code by Vamoss
Original code link:
https://openprocessing.org/sketch/1602827

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

//Inspired by Casey Reas sketch on class Volume 01: elements of reactive form
//Available at https://acg.media.mit.edu/concepts/volume01.html

var client

const pixelation = 3;
var redinhas = [];
var graphic;
var pixelShader;

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	
	graphic = createGraphics(width, height);
	graphic.strokeWeight(3);
	
	pixelShader = new p5.Shader(canvas._renderer, vert, frag);
	
	client = mqtt.connect("wss://test.mosquitto.org:8081")
  	client.subscribe("mqtt/p5js", function (err) {
		console.log("mqtt subscribed");
		if(err) console.error(err);
  })
	
	client.on('connect', function (connack) {
		console.log("mqtt connected", connack.sessionPresent)
	})
	
	client.on("message", function (topic, payload) {
		//console.log(topic, payload.toString())

		mouseX = random(width);
		mouseY = random(height);
		mousePressed();
		
		//var m = JSON.parse(payload.toString());
		//criaRede(m.x * width, m.y * height, m.w, m.h, m.phase, m.vel, m.space, m.definition);
  })
}

function draw() {
	graphic.background(0);
	graphic.stroke(0, 200, 255);

	redinhas.forEach(r => {
		r.phase += r.vel;
		r.y += r.vel * 100;
		var h = r.h + sin(r.phase*3)*40;
		if(r.y > height+r.h*4){
			r.y = -r.h*2.5;
		}else	if(r.y < -r.h*4){
			r.y = height+r.h*4;
		}
		redinha(r.x, r.y, r.w, h, r.phase, r.space, r.definition);
	})

	shader(pixelShader);
	pixelShader.setUniform("steps", [floor(width/pixelation), floor(height/pixelation)]);
	pixelShader.setUniform("tex", graphic);
	rect(0, 0, width, height);
}

function mousePressed(){
	var s = random(0.2, 1);
	var vel = 0;
	while(abs(vel) < 0.001){
		vel = random(-0.01, 0.01);
	}
	var x = mouseX;
	var y = mouseY;
	var phase = random(TWO_PI);
	var w = random(100, 200) * s;
	var h = random(50, 100) * s;
	var space = random(100, 200) * s;
	var definition = floor(random(20, 80) * s);
	redinhas.push({x, y, w, h, phase, vel, space, definition});
	//sendShape(x, y, w, h, phase, vel, space, definition)
}

function sendShape(x, y, w, h, phase, vel, space, definition){
	var message = {x, y, w, h, phase, vel, space, definition};	
	client.publish("mqtt/p5js", JSON.stringify(message))
}

function criaRede(x, y, w, h, phase, vel, space, definition){	
	redinhas.push({x, y, w, h, phase, vel, space, definition});
}

function redinha(x, y, w, h, phase, space, definition){
	for(var a = 0; a < TWO_PI; a += TWO_PI/definition){
		var x1 = cos(a + phase) * w + x;
		var y1 = sin(a + phase) * h + y - space;
		
		var x2 = cos(a - phase) * w + x;
		var y2 = sin(a - phase) * h + y + space;
		
		graphic.line(x1, y1, x2, y2);
	}
}