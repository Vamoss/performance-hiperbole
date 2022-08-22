class Particle {

    constructor(x, y) {

        this.pos  = createVector(x, y);
        this.posa = createVector(x, y);
        this.vel  = createVector(0, 0);
        this.acc  = createVector(0, 0);

        this.c = color(255,0,0);
        this.pal = ["#F0EBE3"];
        this.pali = 0;
        this.sim = 0;
        this.asim = -1;
        this.cf = 4;
        this.cd = 0;

        this.sz = 1;
        this.m  = 1;

        this.nloci = 0;
        this.ndet = 0.01;
        this.ai = 0;
        this.nrad = 0;
    }

    init(data) {
        
        let a = random(TAU);
        this.pos.x += random(this.nrad)*cos(a);
        this.pos.y += random(this.nrad)*sin(a);

        this.setMass(data.mass);
        this.setSize(random(data.size));
        this.setLife(data.life);

        this.setPalette(data.pal);
        this.setColorFreq(data.colorFreq);
        this.setSimmetry(data.simmetry);

        this.setNoiseOctave(data.index);
        this.setInitialAngle(data.initialAngle);
        this.setNoiseRadius(data.noiseRadius);
    }







    interact(x, y) {
        var p = createVector(x,y);
        p.sub(this.pos);
        p.normalize();
        p.div(1.3*this.m);
        this.acc.add(p);
    }

    update() {
        this.posa = this.pos.copy();
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.l--;
    }

    distort() {
        let a = this.ai + TAU*noise(this.ndet*this.pos.x, this.ndet*this.pos.y, this.nloci);
        this.vel.x -= 0.025*this.nrad*cos(a);
        this.vel.y -= 0.025*this.nrad*sin(a);
    }

    outBound() {
        if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            return true;
        }
        return false;
    }



    display() {
        stroke(this.c);
        strokeWeight(this.sz);
        point(this.pos.x, this.pos.y);
    }

    displayColorLine() {
        this.pali = int(mfc/this.cf)%this.cd;
        o1.stroke(this.pal[this.pali]);
        o1.strokeWeight(this.sz);
        o1.line(this.posa.x, this.posa.y, this.pos.x, this.pos.y);
    }

    displayColorLineMirror() {
        this.pali = int(mfc/this.cf)%this.cd;
        o1.stroke(this.pal[this.pali]);
        o1.strokeWeight(this.sz);
        o1.line(width - this.posa.x, this.sim*height - this.asim*this.posa.y, width - this.pos.x, this.sim*height - this.asim*this.pos.y);
    }





    getLife() {
        return this.l;
    }







    setVel(vx, vy) {
        this.vel = createVector(vx, vy);
    }

    setAcc(ax, ay) {
        this.vel = createVector(ax, ay);
    }

    setColor(c) {
        this.c = c;
    }

    setPalette(pal){
        this.pal = pal;
        this.cd = pal.length;
    }

    setColorFreq(cf) {
        this.cf = cf;
    }

    setSimmetry(ss) {
        this.sim = ss;
        this.asim = 2*ss - 1;
    }

    setSize(sz) {
        this.sz = sz;
    }

    setMass(m) {
        this.m = m;
    }

    setLife(l) {
        this.l = l;
    }




    setInitialAngle(ai) { this.ai = ai; }

    setNoiseOctave(idx) { this.nloci = idx; }

    setNoiseDetail(ndet) { this.ndet = ndet; }

    setNoiseRadius(nrad) { this.nrad = nrad; }

}


