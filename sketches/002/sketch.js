p5.disableFriendlyErrors = true;

var p = [];
var s = [];
var data = [];

var hyp;

var itr = 2, mfc;

var o1, o2, o3, o4;

var fsz = 0, fbsz = 4;

var hg = [];
var distCenter = 10000;
var prefx = 0;

var mf = 1;


var animThresh1 = 80, animThresh2 = 100;


let myFont;
function preload() {
  myFont = loadFont('resources/SpartanMB-ExtraBold.otf');
}


function setup() {
  if(windowWidth <= windowHeight) {
    createCanvas(windowHeight, windowWidth);
  }
  else {
    createCanvas(windowWidth, windowHeight);
  }

  
  noiseSeed(09092022);

  frameRate(30);
  background(0);

  o1 = []; o2 = []; o3 = [];
  o1 = createGraphics(width, height);
  o2 = createGraphics(width, height);
  o3 = createGraphics(width, height);
  o4 = createGraphics(width, height);

  p = []; s = []; data = []; hyp = []; data = []; hg = []; 
  mfc = 0; distCenter = 10000; prefx = 0; fsz = 0;

  data = new Data(int(random(dados.length)));
  data.den = 1;


  for (let i = 0; i < dados.length; i++) {
    console.log(dados[i][0][1].length);
    
  }


  let minDim = width;
  fsz = 0.123*minDim - 10.154;
  let dlfsz = 2*fsz + 14.25;
  if(dlfsz > height) {
    fsz = (height - 14.5)/2.1;
  }

  if(fsz >= 200) { fbsz = 4; }
    else if(fsz >= 180) { fbsz = 3; }
      else if(fsz >= 150) { fbsz = 2; } 

  let dtd = 500;
  let ddd = 0.005;

  hyp = new DHyperbola(data.a, data.b, ddd, width, height, width/dtd, height/dtd);
  var pts = hyp.returnPoints();

  for(let i = 0; i < pts.length; i++) {
    p.push(new Particle(pts[i].x, pts[i].y));
    p[i].init(data);
  }

  data.aOri = (p[0].pos.x + p[int((p.length - 1)/2)].pos.x + p[p.length - 1].pos.x)/3;
}














function draw() {

  if(mfc < animThresh1) {
  

    for(let k = 0; k < itr; k++) {


      var fs = 0.005;                   
      var fd = 0.5*width + data.aOri;   
      var fe = 1.0;                     
      if(fd - prefx > fs*width) {
        data.b = data.bOri - height*sin(mfc/data.bFreq);
        hyp = new DHyperbola(data.a, data.b, 0.01, width, height, data.den, data.den);
        hg = hyp.returnPoints();
        prefx = hg[int((hg.length - 1)/2)].x;
        distCenter = fe*fd - prefx;
        data.a -= 0.010*distCenter;
      }
      else {
        var hg = [];
      }


      for (let i = p.length - 1; i >= 0; i--) {
        var d = -1;
        var idx = 0;
        for(let j = 0; j < hg.length; j++) {
          var vd = dist(p[i].pos.x, p[i].pos.y, hg[j].x, hg[j].y);
          if(vd < d || d == -1) {
            d = vd;
            idx = j;
            
          }
          else {
            p[i].interact(hg[idx].x, hg[idx].y);
            break;
          }
        }

        p[i].distort();
        p[i].update();
        p[i].displayColorLine();
        p[i].displayColorLineMirror();

      }


      image(o1, 0, 0);

      if(mf != 0) {
        let frase = data.estado;
        // fsz = 92;
        o4 = createGraphics(width, height);
        o4.background(0,0,0,0);
        o4.textFont(myFont);
        o4.textAlign(CENTER, CENTER);
        o4.textSize(fsz);
        o4.noFill();
        o4.stroke(255);
        o4.strokeWeight(10);
        o4.text(frase, width/2 - 0.0*textWidth(frase.split("\n")[0]), height/2);
        if(mf == 1) {
          o4.strokeWeight(fbsz);
          o4.stroke(0);
          o4.text(frase, width/2 - 0.0*textWidth(frase.split("\n")[0]), height/2);
        }
        image(o4,0,0);

        if(mf == 2) {
          o2 = createGraphics(width, height);
          o2.background(0,0);
          o2.textFont(myFont);
          o2.textAlign(CENTER, CENTER);
          textSize(fsz);
          o2.textSize(fsz);
          o2.fill(255);
          o2.text(frase, width/2 - 0.0*textWidth(frase.split("\n")[0]), height/2);
          blend(o2,0,0,width,height,0,0,width,height, DIFFERENCE);
        }


      }


    } 
  }
  else {
    if(mfc > animThresh2) {
      setup();
    }
  }

  mfc++;
  // noLoop();
}

function keyPressed() {
  noLoop();
}

function windowResized() {
  // location.reload();
  setup();
  // noLoop();
}

function mousePressed() {
  // location.reload();
  setup();
  // noLoop();
}
