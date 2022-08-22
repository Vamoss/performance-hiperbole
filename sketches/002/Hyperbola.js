class DHyperbola {
    
    constructor(a, b, d, w, h, dw, dh) {
        this.a = a;
        this.b = b;
        this.d = d;
        this.w = w;
        this.h = h;
        this.dw = dw;
        this.dh = dh;
        this.hip = [];
        this.aMin = PI/2;
        this.aMax = 3*PI/2;                
        this.hyperbola2pointsEuclid(min(dw, dh));
    }



    hyperbola2pointsEuclid(threshold) {
        var tt = threshold*threshold;
        this.hip = [];
        var xant = 10000000, yant = 10000000;
        for (let t = this.aMin; t < this.aMax; t += this.d) {
          let x  = this.a/cos(t);
          let y1 = this.b*tan(t);
          let y2 = -this.b*tan(t);
        if(x > -this.w/2 && x < this.w/2) {
            if(y1 > -this.h/2 && y1 < this.h/2) {
                if(this.distSqr(x, y1, xant, yant) > tt) {
                    this.hip.push(createVector(x + this.w/2, y1 + this.h/2));
                    xant = x;
                    yant = y1;
                }
            }
        }
        } 
    }

    distSqr(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return dx*dx + dy*dy;
    }


    returnPoints() {
        return this.hip;
    }

}