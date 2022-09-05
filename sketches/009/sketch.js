let sig = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);
  strokeWeight(1);
  frameRate(60);    
}

function draw() { 
  let i2 = frameCount/60;
  let i3 = height/20 + frameCount%120;
  translate(width/2 + width/4*(-sin(i2)),  height/2);
  rotate(sig*i2);
  
  if (frameCount%240 == 0)
      {
       sig = - sig; 
      }
  
   for(let i=0; i<500; i++)
    {
      s = random(1000);
      q = map(s,0,1000,-HALF_PI,HALF_PI);
      
      stroke(255,255,255,140);
      if (frameCount%30 > 15)
      {
        stroke(0,0,0,255);
      }
      point(i3/cos(q),i3*tan(q));
      point(-i3/cos(q),i3*tan(q));
        
    }
}