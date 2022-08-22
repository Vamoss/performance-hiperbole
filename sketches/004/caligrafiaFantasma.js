let V = []; //aqui a lista pvector
let listaStrings = [];
let listaV = [];
let iterators = [0, 0, 0, 0, 0, 0];
let sorteia = false;
let j,
  o = 0;
let indRes = 0;
let largPena;
let paleta = ["#00916e", "#259ad0", "#ffcf00", "#ee6123", "#fa003f", "#000411"];

function preload() {
  for (let i = 0; i < 6; i += 1) {
    let s = floor(random(1, 10.9));
    let array = ["data", nf(s)];
    let directory = join(array, "/");
    let array2 = [directory, "txt"];
    let file = join(array2, ".");
    let input = loadStrings(file);
    listaStrings.push(input);
  }
}

function setup() {
  createCanvas(900, 900);
  background(255);
  noStroke();
  largpena = 50;
  //torna cada lista de pontos uma lista de vetores e então adiciona esta lista para a lista de vetores listaV
  for (let i = 0; i < listaStrings.length; i += 1) {
    V = [];
    for (let j = 0; j < listaStrings[i].length; j += 1) {
      let spl = split(listaStrings[i][j], ", ");
      V.push(createVector(float(spl[0]), float(spl[1])));
    }
    listaV.push(V);
  }
  //print(listaV);
  listaStrings = [];

}

function draw() {
  if (frameCount % 89 == 0) {
    o += 1;
    // print(o);
  } else if (o > 10) {
    o = 0;
  }
  fill(255, o);
  rect(-10, -10, width + 10, height + 10);
  //itera pela lista de vetores e, para cada item desta lista, recupera os vetores e desenha o traço na tela com eles
  for (let i = 0; i < listaV.length; i++) {
    if (iterators[i] < listaV[i].length - 3) {
      switch (i) {
        case 0:
          iterators[0] += 1;
          j = iterators[0];
          // print(listaV[i][j]);
          fill(paleta[0]);
          if (listaV[i][j].x == -1 || listaV[i][j + 1].x == -1) {
            noStroke();
            noFill();
            iterators[0]++;
          }
          break;
        case 1:
          iterators[1]++;
          j = iterators[1];
          //print("iterators 1: " + j);
          fill(paleta[1]);
          if (listaV[i][j].x == -1 || listaV[i][j + 1].x == -1) {
            noStroke();
            noFill();
            iterators[1]++;
          }
          break;
        case 2:
          iterators[2]++;
          j = iterators[2];
          //print("iterators 2: " + j);
          fill(paleta[2]);
          if (listaV[i][j].x == -1 || listaV[i][j + 1].x == -1) {
            noStroke();
            noFill();
            iterators[2]++;
          }
          break;
        case 3:
          iterators[3]++;
          j = iterators[3];
          fill(paleta[3]);
          if (listaV[i][j].x == -1 || listaV[i][j + 1].x == -1) {
            noStroke();
            noFill();
            iterators[3]++;
          }
          break;
        case 4:
          iterators[4]++;
          j = iterators[4];
          fill(paleta[4]);
          if (listaV[i][j].x == -1 || listaV[i][j + 1].x == -1) {
            noStroke();
            noFill();
            iterators[4]++;
          }
          break;
        case 5:
          iterators[5]++;
          j = iterators[5];
          fill(paleta[5]);
          if (listaV[i][j].x == -1 || listaV[i][j + 1].x == -1) {
            noStroke();
            noFill();
            iterators[5]++;
          }
          break;
      }
      let x = listaV.at(i).at(j + 1).x;
      let y = listaV.at(i).at(j + 1).y;
      let px = listaV.at(i).at(j).x;
      let py = listaV.at(i).at(j).y;
      quad(
        x + largpena * cos(QUARTER_PI),
        y - largpena * sin(QUARTER_PI),
        x - largpena * cos(QUARTER_PI),
        y + largpena * sin(QUARTER_PI),
        px - largpena * cos(QUARTER_PI),
        py + largpena * sin(QUARTER_PI),
        px + largpena * cos(QUARTER_PI),
        py - largpena * sin(QUARTER_PI)
      );
    } else {
      iterators[i] = 0;
      indRes = i;

    }
  }
}





