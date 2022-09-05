// Código baseado nesse tutorial:
// https://gorillasun.de/blog/an-algorithm-for-irregular-grids

let padding;
let grid_divisors_x;
let grid_divisors_y;
let grid_spacing_x;
let grid_spacing_y;

let rect_infos = [];
let bools = [];

let pallete = [
  {"name":"Cerulean Crayola","hex":"21a2ce","rgb":[33,162,206],"cmyk":[84,21,0,19],"hsb":[195,84,81],"hsl":[195,72,47],"lab":[62,-18,-32]},
  {"name":"Pastel Pink","hex":"e9a7a0","rgb":[233,167,160],"cmyk":[0,28,31,9],"hsb":[6,31,91],"hsl":[6,62,77],"lab":[75,23,13]},
  {"name":"Slimy Green","hex":"00a200","rgb":[0,162,0],"cmyk":[100,0,100,36],"hsb":[120,100,64],"hsl":[120,100,32],"lab":[58,-61,59]},
  {"name":"Paradise Pink","hex":"f23d63","rgb":[242,61,99],"cmyk":[0,75,59,5],"hsb":[347,75,95],"hsl":[347,87,59],"lab":[55,70,21]},
  {"name":"Dark Purple","hex":"140020","rgb":[20,0,32],"cmyk":[38,100,0,87],"hsb":[278,100,13],"hsl":[278,100,6],"lab":[2,13,-15]}]

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  

  padding = 0;

  grid_divisors_x = 10;
  grid_divisors_y = 10;

  grid_spacing_x = (width - padding*2) / grid_divisors_x;
  grid_spacing_y = (height - padding*2) / grid_divisors_y;

  for(let x = 0; x < grid_divisors_x; x++) {
    let column = [];
    for(let y = 0; y < grid_divisors_y; y++) {
      column.push(true);
    }
    bools.push(column);
  }

  constructGrid([1, 2, 3, 5, 8], [3, 5]);
  constructGrid([1, 2, 3], [1, 2, 3]);
  constructGrid([1, 2], [1, 2]);
  constructGrid([1], [1]);
  background(0);
}

function draw() {
  drawGrid();
}

function constructGrid(rect_widths, rect_heights) {

  for(let x = 0; x < grid_divisors_x - max(rect_widths) + 1; x++) {
    for(let y = 0; y < grid_divisors_y - max(rect_heights) + 1; y++) {
      
      let fits = true;

      let rect_width = random(rect_widths);
      let rect_height = random(rect_heights);

      if(x + rect_width > grid_divisors_x || y + rect_height > grid_divisors_y) {
        fits = false;
      }

      for(let grid_column = x; grid_column < x + rect_width; grid_column++) {
        for(let grid_line = y; grid_line < y + rect_height; grid_line++) {  
          if(bools[grid_column][grid_line] == false) {
            fits = false;
          }
        }
      }

      if(fits) {

        for(let grid_column = x; grid_column < x + rect_width; grid_column++) {
          for(let grid_line = y; grid_line < y + rect_height; grid_line++) {
            bools[grid_column][grid_line] = false;
          }
        }

        rect_infos.push(new Recti(x, y, rect_width, rect_height));
      }

    }
  }
}

function drawGrid() {
  for(let i = 0; i < rect_infos.length; i++) {

    let r = rect_infos[i];

    rectMode(CENTER);
    let x = r.x * grid_spacing_x + padding + (r.width * grid_spacing_x)/2;
    let y = r.y * grid_spacing_y + padding + (r.height * grid_spacing_y)/2;
    let w = r.width * grid_spacing_x ;
    let h = r.height * grid_spacing_y ;

    let gradient = drawingContext.createConicGradient((frameCount/300 + (r.random_ref * TWO_PI) % TWO_PI), x, y );
    for(let i = 0; i < r.gradient_stops.length; i++) {
      let c = r.gradient_stops[i];
      let h = (frameCount*3*r.random_ref + c.hsl[0] + (r.random_ref * 360)) % 360;
      gradient.addColorStop( map(i, 0, r.gradient_stops_qty, 0, 1), `hsl(${c.hsl[0] + h}, ${c.hsl[1]}%, ${c.hsl[2]}%`);
    }

    drawingContext.fillStyle = gradient;

    drawingContext.shadowColor = "#" + r.shadow_color.hex;
    drawingContext.shadowBlur = r.blur_radius;
    
    noStroke();
    
    rect(x, y, w, h);
    drawingContext.filter = `blur(${r.blur_radius * pixelDensity()}px)`;

  }
}


class Recti {
  constructor(x, y, rwidth, rheight) {
    this.x = x;
    this.y = y;
    this.width = rwidth;
    this.height = rheight;
    this.random_ref = random(1);
    if(random(1) > 0.5) {
      this.blur_radius = random(2, 10);
    } else {
      this.blur_radius = random(10, 50);
    }
    this.shadow_color = random(pallete);
    this.accent_color = random(pallete);
    this.gradient_stops_qty = floor(random(2, 10));
    this.gradient_stops = [];
    for(let i = 0; i < this.gradient_stops_qty; i++) {
      let new_stop;
      if(random(1) > 0.3) {
        new_stop = random(pallete);
      } else {
        new_stop = this.accent_color;
      }
      this.gradient_stops.push(new_stop);
    }
  }
}

function rect_infos_reset() {
  rect_infos = [];
  
  for(let column = 0; column < grid_divisors_x; column++) {
    for(let line = 0; line < grid_divisors_y; line++) {
      bools[column][line] = true;
    }
  }

  constructGrid([1, 2, 3, 5], [1, 2, 3, 5]);
  constructGrid([1, 2], [1, 2]);
  constructGrid([1], [1]);
}

function mousePressed() {
  rect_infos_reset();
}