
/******************
Code by Vamoss
Original code link:
https://openprocessing.org/sketch/1622001

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

//inspired in
//https://www.istockphoto.com/br/vetor/c%C3%A9lulas-biol%C3%B3gicas-padr%C3%A3o-sem-emendas-gm117880281-8900911?st=3e2bf4c

const total = 250;
const totalLayers = 1;
var points = [];
var scales = [];
var polygons = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	points = new Float64Array(total * 2);
	scales = new Array(total);
	var j = 0;
	while(j < total){
		var x = round(random(width));
		var y = round(random(height));
		points[j * 2 + 0] = x;
		points[j * 2 + 1] = y;
		scales[j] = {scale:1};
		j++;
	}
	
	for(var i = 0; i < total; i++){
		var delay = random(100, 3000);
		anime({
			targets: scales[i],
			duration: 1000,
			direction: 'alternate',
			loop: true,
			scale: 0,
			easing: 'easeInOutExpo',
			delay: delay
		});
	}
	
	var delaunay = new Delaunay(points);
	var voronoi = delaunay.voronoi([0, 0, width, height]);
	polygons = Array.from(voronoi.cellPolygons());
}

function draw() {
	background("#000000");
	noFill();
	
	stroke("#FF1493");
	strokeWeight(3);
	drawVoronoi();
	
	//draw points
	strokeWeight(8);
	for(var i = 0; i < total; i++){
		point(points[i * 2], points[i * 2 + 1]);
	}
}

function drawVoronoi(){
	for (var i = 0; i < polygons.length; ++i) {
		push();
			translate(points[i * 2 + 0], points[i * 2 + 1]);
			scale(scales[i].scale);
			translate(-points[i * 2 + 0], -points[i * 2 + 1]);
			const polygon = polygons[i];
			beginShape();
			for (var j = 0; j < polygon.length; ++j) {
				vertex(...polygon[j]);
			}
			endShape();
		pop();
	}
}