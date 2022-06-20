let img;
let smallPoint, largePoint;

function preload() {
  img = loadImage('hortus.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  smallPoint = 4;
  largePoint = 40;
  imageMode(CENTER);
  noStroke();
  background(255);
  img.loadPixels();
}

function draw() {
  let pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let pix = img.get(x, y);
  fill(pix, 128);

  x = random(width);
  y = random(height);
  ellipse(x, y, pointillize, pointillize);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}