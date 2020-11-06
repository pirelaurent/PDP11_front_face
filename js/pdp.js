
let PDP_11;
let modeGraph; 
/*
  we create a pdp instance inside preload as PDP loads some font
 */
function preload() {
    PDP_11 = new PDP();
    /* to play, you can change parts of the name of computer. (But logo will be written)*/
    //PDP_11.name = 'pep-inno';
    //PDP_11.serialNb = "110_110_110" ; 
    //PDP_11.pdpLogo = "chief";
    /**/
}

function setup() {
    // works with P2D or WEBGL .
    var cnv = createCanvas(800, 800, P2D); 
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    background(0);
}

function draw() {
    colorMode(RGB);
    background(0);
    // calculate a scale to fill full width of canvas with PDP
    var aScale = width/PDP_11.width;
    push();
        // adjust to draw PDP at scale on the lower part of canvas
        if (_renderer.drawingContext instanceof WebGLRenderingContext) 
             translate(-width/2,height/2- PDP_11.height*aScale);
        else translate(0,height-PDP_11.height*aScale);

    scale(aScale);
    PDP_11.draw();
    pop();
  


}

