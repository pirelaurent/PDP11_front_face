
let PDP_11;
/*
  we create a pdp instance inside preload as PDP loads some font
 */
function preload() {
    PDP_11 = new PDP();
}

function setup() {
    var cnv = createCanvas(800, 800, WEBGL);
    // center canvas relative to real screen 
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    background(0);
}



function draw() {
    background(0);
    // calculate a scale to fill full width of canvas with PDP
    var aScale = width/PDP_11.width;
    // adjust to draw PDP at scale on the lower part of canvas
    translate(-width/2,height/2 - PDP_11.height*aScale,0);
    push();
    scale(aScale);
    PDP_11.draw();
    pop();
}

