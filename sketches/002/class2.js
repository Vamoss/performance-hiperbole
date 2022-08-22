class Data {

    constructor(index) {

        this.index = index;
        this.estado = dados[index][0][1];
        this.simmetry = this.estado.length%2;


        this.mass = dados[index][19][1];
        this.size = 3;
        this.life = 100;

        this.pal = gpal[index];
        this.colorFreq = 4;

        this.a = 0*0.45*width + 1*width*map(dados[index][9][1], 5000, 140000, 0.45, 0.35);
        this.aOri = 0;
        this.b = 0*0.9*height + 1*(dados[index][6][1]/5.2)*(dados[index][6][1]/5.2)*0.9*height;
        this.bOri = this.b;
        this.bFreq = dados[index][3][1];
        this.den = 10;

        this.regen1 = dados[index][5][1];
        this.regen2 = dados[index][6][1];

        this.noiseFactor = 0;
        this.noiseRadius = map(dados[index][22][1], 0, 5000, 1, 8);
        this.initialAngle = map(dados[index][13][1], 600, 2500, -PI/2, PI/2);
    }

}