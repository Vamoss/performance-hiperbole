const frag = `
precision lowp float;

uniform vec2 steps;
uniform sampler2D tex;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  // Flip the texture coords
  uv.y = 1.0 - uv.y;
  
  vec2 pixelUv = floor( uv * steps ) / steps;
  vec4 color = texture2D(tex, pixelUv);
  gl_FragColor = color;
}`