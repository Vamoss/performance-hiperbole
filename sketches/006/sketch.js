
var circles = []

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(255);
}

function addCircle(x, y, life, followAngle){
	circles.push({
		pos: {x, y},
		prevPos: {x, y},
		dir: random() > 0.5 ? 1 : 1.7,
		radius: random(4, 7),
		angle: followAngle,
		followAngle,
		iniLife: life,
		life
	});
}

function draw() {
	if(circles.length == 0){
		addCircle(width/2, height/2, 18, random(TWO_PI));
		fill (0, 40);
		noStroke();
		rect(0, 0, width, height);
	}
	
	for(var i = circles.length-1; i >=0; i--){
		var circle = circles[i];
		
		if(abs(circle.angle-circle.followAngle) > 0.8){
			circle.dir *= -1;
			circle.angle = angleLerp(circle.angle, circle.followAngle, 0.1);
		}
		
		circle.angle += 1/circle.radius*circle.dir;
		circle.pos.x += cos(circle.angle) * circle.radius;
		circle.pos.y += sin(circle.angle) * circle.radius;
		
		if(circle.pos.x < 0 || circle.pos.x > width || circle.pos.y < 0 || circle.pos.y > height){
			circle.angle += PI;
		}
		
		strokeWeight(pow(circle.iniLife, 2)/20);
		stroke(color(255));
		line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y);

		circle.prevPos.x = circle.pos.x;
		circle.prevPos.y = circle.pos.y;
		
		circle.life--;
		if(circle.life<=0){
			if(circle.iniLife>8){
				addCircle(circle.pos.x, circle.pos.y, circle.iniLife*0.90, circle.followAngle+0.5);
				addCircle(circle.pos.x, circle.pos.y, circle.iniLife*0.90, circle.followAngle-0.5);
			}
			circles.splice(i, 1);
		}
	}
	          
		fill (0, 40);
		noStroke();
		rect(0, 0, width, height);
	ellipse(width/2, height/2, 50, 50);
}


function shortAngleDist(a0,a1) {
    var max = Math.PI*2;
    var da = (a1 - a0) % max;
    return 2*da % max - da;
}

function angleLerp(a0,a1,t) {
    return a0 + shortAngleDist(a0,a1)*t;
}