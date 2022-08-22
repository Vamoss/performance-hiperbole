/******************
Code by Vamoss
Original code link:
https://openprocessing.org/sketch/1440432

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/
var client

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	
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
		var message = JSON.parse(payload.toString())
		fill(message.r * 255,
				 message.g * 255,
				 message.b * 255)
		var x = message.x * width
		var y = message.y * height
		var size = message.size * width
		if(message.shape == "circle"){
			circle(x, y, size)
		}else if(message.shape == "rect"){
			rect(x, y, size, size)
		}else if(message.shape == "triangle"){
			beginShape()
			for(var a = 0; a < TWO_PI; a += TWO_PI/3){
				vertex(x + cos(a) * size, y + sin(a) * size)
			}
			endShape()
		}
  })
}

function draw() {
	if(mouseIsPressed){
		sendShape(mouseX/width, mouseY/height, 0.01)
	}
}

function keyPressed(){
	sendShape(random(), random(), random()/5)
}

function sendShape(x, y, size){
	var message = {
		shape: random(["circle", "rect", "triangle"]),
		x, y, size,
		r: random(),
		g: random(),
		b: random()
	}
	
	client.publish("mqtt/p5js", JSON.stringify(message))
}