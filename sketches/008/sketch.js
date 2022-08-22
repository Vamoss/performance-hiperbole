/// Pattern By Bruna M. /// Os Olhos da Formiga - Teste 01 - Um olhar criativo sobre a padronização. Estudo de texturas. 

let x= 0;
let y=0;
let spacing=10

function setup() {
  createCanvas(windowWidth, windowHeight);
  background (0,128,0);
}

function draw() {
  stroke (124,252,0);
  if (random (1) < 0.5) {
    line(x, y, x+10, y+ spacing);
} else {
  line (x, y+spacing, x+spacing, y);
  }
  x=x+spacing; 
  if (x>width) { 
    x=0;
    y= y+spacing; 
  
  }
 
}
 

  