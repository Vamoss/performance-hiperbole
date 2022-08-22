// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

//ig: @vfracto
//tt: @printnaosome && @visualfracto
//nano_ufrj por @vfracto

var hydra = new Hydra({ detectAudio: false })

osc(26)
  .diff(osc(10, -0.1))
  .layer(src(o0).scale(1.01)
         .layer(osc(10, 0.1, [0,2].smooth())
                .mask(shape(999, [0.1, 0.6].smooth().fast(0.3))
                .modulate(noise(), 0.01)
        ))
.scrollX(()=>0.01*Math.sin(time/3))
.scrollY(()=>0.01*Math.sin(time/4)
        ))
.modulate(o0, 0.01)
.contrast(1)
.out()
