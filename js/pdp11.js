/*
 front end of an old PDP11
 colors found at http://www.chdickman.com/pdp8/DECcolors/
 @author pirelaurent

*/

class PDP {
    constructor() {
    // comment this line if no web server to deliver font
       this.helvetica = loadFont('./assets/AG_Helvetica_Bold.ttf');
    // id of the machine 
        this.name = "digital";
        this.serialNb = "11";
        this.pdpLogo = "pdp";
        // global height and width . 
        this.width = 440;
        this.height = 180;
        // depth is invented 
        this.pdp_d = 300;
        // colors 
        this.background = color(20);
        this.brightRose = color('rgb(156,43,61)');
        this.magenta = color('rgb(110,35,76)');
        this.traitColor = color('grey');
        this.textColor = color(150);
        this.pdpName = color(160);
        this.addr18Leds = [];
        this.data16Leds = [];
        this.createLeds();
        this.modeWebgl = false; // ie 2D
        this.bolts = false;

    }

    draw() {
        if (_renderer.drawingContext instanceof WebGLRenderingContext) this.modeWebgl = true;
        fill(this.background);
        stroke(50);
        push();
        translate(this.width / 2, this.height / 2, -this.pdp_d / 2);
        if (this.modeWebgl) box(this.width, this.height, this.pdp_d);
        pop();

        // background of panel   
        noStroke();
        stroke(40);
        rect(0, 0, this.width, this.height-1);
        if (this.bolts) this.drawBolts();
        noFill();
        stroke(50);
        //rect(14,4,this.width -28, this.height -14);


        // text font and default if not loaded
        if (this.helvetica) textFont(this.helvetica) ; else textFont('someDefault');
        this.title_bar();
        this.adress_bar();
        this.dataBar();
        this.lowerBar();
        this.draw_switches_left_bar();
        this.controlBar();
    }


    //----------------- first lane with title 
    title_bar() {
        push();
        stroke(this.traitColor);
        strokeWeight(2);
        fill(this.magenta);
        translate(20, 9);
        rect(0, 0, 400, 21);
        this.machineName();
        stroke(this.traitColor);
        fill(this.brightRose);
        rect(0, 20, 400, 9);
        pop();
    }

    // ---------- write machine name & serial number 
    machineName() {
        push();
        textSize(16);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        translate(20, 0);
        for (var i = 0; i < this.name.length; i++) {
            var c = this.name.charAt(i);
            fill(this.textColor);
            noStroke();
            text(c, 8, 9);
            noFill();
            stroke(this.traitColor);
            rect(0, 0, 15, 20);
            translate(15, 0);
        }
        translate(10, 0);
        // pdp special letters
        this.drawPDPLetters();
        pop();
    }
    /*
          PDP letters are made of concentric circles 
          with symetric bars for p and d 
          Default is here at 60 pixels per letter. 
          Scale used to put it on bar
      */

    drawPDPLetters() {
        push();
        translate(12, 9);
        if (this.pdpLogo == 'pdp') {
            push();
            strokeWeight(2);
            if (this.modeWebgl) strokeWeight(0.8);
            scale(0.18);
            this.drawP();
            translate(50, 0);
            this.drawD();
            translate(54, 0);
            this.drawP();
            pop();
            translate(28, 0);
        }
        else {
            strokeWeight(1);
            stroke('grey');
            textAlign(LEFT);
            if (this.modeWebgl) fill('grey'); else noFill();
            textSize(14);
            for (var c = 0; c < this.pdpLogo.length; c += 1) {
                var char = this.pdpLogo.charAt(c);
                text(char, 0, 0);
                translate(textWidth(char) + 2, 0);
            }
            translate(10, 0);
        }
        // add serial number 
        fill(this.textColor);
        textAlign(LEFT, CENTER);
        textStyle(NORMAL);
        if (this.modeWebgl) textSize(13); else textSize(12);
        noStroke();
        text(this.serialNb, 0, 0);
        pop();
    }

    // letter p 

    drawP() {
        push();
        stroke(this.textColor);
        fill(this.magenta);
        ellipse(0, 0, 50);
        ellipse(0, 0, 28);
        // z coordinate in case of Webgl : rectangle must be over ellipse
        translate(-26, -25, 4);
        noStroke();
        rect(0, 0, 10, 70);
        stroke(this.textColor);
        line(0, 0, 0, 70);
        line(0, 0, 10, 0);
        line(0, 70, 10, 70);
        line(10, 70, 10, 45);
        line(10, 0, 10, 5);
        pop();
    }
    // letter d

    drawD() {
        push();
        fill(this.magenta);
        stroke(this.textColor);
        ellipse(0, 0, 50);
        ellipse(0, 0, 28);
        translate(26, 25, 4);
        noStroke();
        rect(0, 0, -10, -70);
        stroke(this.textColor);
        line(0, 0, 0, -70);
        line(0, -70, -10, -70);
        line(-10, -70, -10, -45);
        line(0, 0, -10, 0);
        line(-10, 0, -10, -5)
        pop();
    }



    //--------------------- adress bar 
    adress_bar() {
        push();
        strokeWeight(2);
        stroke(this.traitColor);
        translate(60, 50);
        for (var hb = 0; hb < 6; hb++) {
            fill(this.magenta);
            if (hb % 2 == 1) fill(this.brightRose);

            push();
            for (var i = 0; i < 3; i++) {
                var aLed = this.addr18Leds[hb * 3 + i];
                aLed.drawInContext();
                translate(10, 0);
            }
            pop();
            rect(0, 0, 40, 5);
            translate(40, 0);
            this.randomizeLeds(this.addr18Leds, 5);
        }

        //2 blocks of 2 leds on right avec 2 led chacun

        translate(20, 0);
        this.offLed.drawInContext();
        translate(10, 0);
        this.onLed.drawInContext();
        translate(-10, 0);
        fill(this.magenta);
        rect(0, 0, 30, 5);
        translate(30, 0);
        this.onLed.drawInContext();
        translate(10, 0);
        this.addr18Leds[0].drawInContext();
        translate(-10, 0);
        fill(this.brightRose);
        rect(0, 0, 30, 5);

        // more on right a block fetch/exec 

        translate(35, 0);
        random(this.leds).drawInContext();
        fill(this.magenta);
        rect(0, 0, 15, 5);
        translate(10, 0);
        random(this.leds).drawInContext();
        translate(5, 0);
        fill(this.brightRose);
        rect(0, 0, 15, 5);
        pop();

        // add a text on top of led's bar 

        push();
        translate(200, 47);
        textSize(6);
        textAlign(CENTER);
        stroke(this.textColor);
        fill(this.textColor);
        noStroke();
        text('ADDRESS REGISTER', 0, 0);

        // add text 
        textSize(5);
        translate(135, 0);
        text('RUN', 0, 0);
        translate(30, 0);
        text('BUS', 0, 0);
        translate(27, 0);
        text('FETCH', 0, 0);
        translate(18, 0);
        text('EXEC', 0, 0);
        pop();
    }

    //----------------------------- data bar 

    dataBar() {
        push();
        stroke(this.traitColor);
        // one alone 
        translate(80, 90);
        this.data16Leds[0].drawInContext();
        fill(this.magenta);
        rect(0, 0, 20, 5);

        // serie of 5 groups of 3 leds 

        translate(20, 0);
        for (var hb = 0; hb < 5; hb++) {
            fill(this.magenta);
            if (hb % 2 == 1) fill(this.brightRose);

            push();
            for (var i = 0; i < 3; i++) {
                var aLed = this.data16Leds[hb * 3 + i];
                aLed.drawInContext();
                translate(10, 0);
            }
            pop();

            rect(0, 0, 40, 5);
            translate(40, 0);
            this.randomizeLeds(this.data16Leds, 4);
        }
        // 2 more on right 

        translate(20, 0);
        this.offLed.drawInContext();
        translate(10, 0);
        this.offLed.drawInContext();
        translate(-10, 0);
        fill(this.magenta);
        rect(0, 0, 30, 5);
        translate(30, 0);
        this.offLed.drawInContext();
        translate(10, 0);
        this.offLed.drawInContext();
        translate(-10, 0);

        fill(this.brightRose);
        rect(0, 0, 30, 5);

        // more on right 

        translate(35, 0);

        this.onLed.drawInContext();
        translate(10, 0);
        this.startLed.drawInContext();
        translate(-10, 0);
        fill(this.magenta);
        rect(0, 0, 30, 5);
        pop();
        // add data text on top of data bar
        push();
        translate(200, 88);
        textSize(6);
        noStroke();
        textAlign(CENTER);
        fill(this.textColor);
        text('DATA', 0, 0);
        // add text 
        textSize(5);
        translate(134, 0);
        text('SOURCE', 0, 0);
        translate(31, 0);
        text('DESTINATION', 0, 0);
        translate(35, 0);
        text('ADDRESS', 0, 0);
        pop();
    }

    //---------------------------------- lower bar with switches 

    lowerBar() {
        // set origin 
        push();
        translate(19, 130);

        // tree parts with lock 

        stroke(this.traitColor);
        fill(this.brightRose);
        rect(0, 0, 40 / 3, 33);
        fill(this.magenta);
        rect(40 / 3, 0, 40 / 3, 33);
        fill(this.brightRose);
        rect(80 / 3, 0, 40 / 3, 33);
        this.drawLock();

        // main horizontal bar 

        translate(40, 0);
        fill(this.brightRose);
        stroke(this.traitColor);
        rect(0, 0, 240, 4);
        translate(0, 4);
        fill(this.magenta);
        rect(0, 0, 240, 9);
        noFill();
        rect(0, 9, 240, 20);

        // write each bit number 

        textSize(6);

        textAlign(CENTER, BOTTOM);
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 3; j++) {
                stroke(this.traitColor);
                rect(0, 0, 40 / 3, 9);
                noStroke();
                fill(this.textColor);
                text(17 - (i * 3 + j), 20 / 3, 8);
                noFill();
                translate(40 / 3, 0);
            }
        }
        pop();
    }

    // ----------------- draw a lock in lower bar 

    drawLock() {
        push();
        // center of rectangle  
        translate(20, 15, 1);
        fill(0);
        stroke(0);
        ellipse(0, 0, 15);
        // full circle
        fill(this.traitColor);
        ellipse(0, -1, 13);
        // marks 
        strokeWeight(2);
        ellipse(0, -1, 7);
        line(-3, 0, -5, 0);
        line(3, 0, 5, 0);
        line(0, -3, 0, -5);
        // small reflect
        fill(150);
        noStroke();
        ellipse(1, -1, 3);
        pop();
    }
    // --- for corners 
    drawBolts(x,y){
        stroke(50);
        this.drawBolt(8, 8);
        this.drawBolt(this.width - 8, 8);
        this.drawBolt(8, this.height - 8);
        this.drawBolt(this.width - 8, this.height - 8);
    }
    drawBolt(x, y) {
        fill(0);
        ellipse(x, y, 5);
        fill(50);
        ellipse(x, y, 2);
    }



    //-----------------------  draw switches under bit number. all down 

    draw_switches_left_bar() {
        push();
        translate(61, 145);
        var aColor = this.magenta;
        for (var i = 0; i < 6; i++) {
            var aColor = this.magenta;
            if (i % 2 == 0) aColor = this.brightRose;
            for (var j = 0; j < 3; j++) {
                this.switch_down(aColor);
                translate(240 / 18, 0);
            }
        }
        pop();
    }

    // ------- instruction bar to control PDP 
    // LOAD    EXAM    CONT  ENABLE    S-INST          START    DEP
    // ADDR                  HALT      S-CYCLE 

    controlBar() {
        var tSize = 4.3;
        push();
        textSize(tSize);
        var labels = ['LOAD', 'EXAM', 'CONT', 'HALT', 'S-INST', 'START'];
        translate(304, 130, 0);
        stroke(this.traitColor);
        rect(0, 0, 90, 33);

        for (var i = 0; i < 6; i++) {
            var current = this.magenta;
            if (i % 2 == 1) current = this.brightRose;
            fill(current);
            stroke(this.traitColor);
            rect(0, 0, 45 / 3, 13);
            // text inside 
            textAlign(LEFT, TOP);
            fill(this.textColor);
            noStroke();

            if (i == 0) {
                text('LOAD', 1, 2);
                text('ADDR', 1, 8);

                line(1, 7, 11, 7);
            } else
                if (i == 3) {
                    text('ENABLE', 1, 2);
                    text(' HALT', 1, 8);
                    line(1, 7, 11, 7);
                } else
                    if (i == 4) {
                        text('S-INST', 1, 2);
                        textSize(tSize - 0.7);
                        text('S-CYCLE', 1, 8);
                        textSize(tSize);
                        line(1, 7, 11, 7);
                    } else
                        //if ((i==1)||(i==2)||i==5||i==6)
                        text(labels[i], 1, 5);

            // switches under instruction . All up but 5th

            push();
            translate(1, 14, 1);
            if (i == 5) this.switch_half_down(current);
            else this.switch_up(current);
            pop();
            translate(45 / 3, 0);
        }

        // last isolated control

        translate(5, 0);
        noFill();
        stroke(this.traitColor);
        rect(0, 0, 45 / 3, 33);
        fill(this.magenta);
        rect(0, 0, 45 / 3, 13);
        fill(this.textColor);
        noStroke();
        text(' DEP', 1, 5);

        translate(1, 14, 1);
        this.switch_up(this.magenta);
        pop();
    }

    // faire un drawLabelBox avec 1 ou 2 lignes selon 


    //----------- draw a swith in down position 

    switch_down(someColor) {
        var color1 = [hue(someColor), saturation(someColor) + 10, brightness(someColor) + 20];
        var color2 = [hue(someColor), saturation(someColor) + 10, brightness(someColor)];
        push();
        colorMode(HSB);
        fill(color1);
        noStroke();
        rect(0, 0, 10, 3);

        fill(color2);
        beginShape();
        vertex(0, 3);
        vertex(10, 3);
        vertex(9, 16);
        vertex(1, 16);
        vertex(0, 5);
        endShape();
        pop();
    }

    //------------------------ draw a switch in up position 

    switch_up(someColor) {
        var color1 = [hue(someColor), saturation(someColor) + 10, brightness(someColor) + 10];
        var color2 = [hue(someColor), saturation(someColor) + 10, brightness(someColor) - 15];
        var color3 = [hue(someColor), saturation(someColor) + 15, brightness(someColor) + 30];
        push();
        noStroke();
        colorMode(HSB);
        fill(color3);
        beginShape();
        vertex(0, 0);
        vertex(10, 0);
        vertex(10, 3);
        vertex(0, 3);
        endShape();
        fill(color2);
        noStroke();
        rect(0, 0, 10, 17);
        fill(color1);
        var h = 8;
        var w = 40 / 3 - 1;
        beginShape();
        vertex(0, 0);
        vertex(w, 0);
        vertex(w, h);
        vertex(6, h);
        vertex(0, 0);
        endShape();
        // small reflect on top 
        fill(color3);
        beginShape();
        vertex(1, 0);
        vertex(w, 0);
        vertex(w, 2);
        vertex(4, 2);
        endShape();
        pop();
    }

    switch_half_down(someColor) {
        var color1 = [hue(someColor), saturation(someColor) + 10, brightness(someColor) + 10];
        var color2 = [hue(someColor), saturation(someColor) + 10, brightness(someColor) - 30];
        var color3 = [hue(someColor), saturation(someColor) + 5, brightness(someColor) - 10];
        push();
        noStroke();
        colorMode(HSB);
        // background
        fill(color2);
        noStroke();
        rect(0, 0, 10, 17);

        // handle 
        fill(color3);
        var h = 12;
        var w = 40 / 3 - 2;
        beginShape();
        vertex(1, 0);
        vertex(w, 0);
        vertex(w - 1, h);
        vertex(2, h);
        vertex(1, 0);
        endShape();


        // small reflect on top 
        fill(color1);
        beginShape();
        vertex(0, 0);
        vertex(w - 1, 0);
        vertex(w - 1, 3);
        vertex(1, 3);
        endShape();
        pop();
    }
    /*
     use different colors to simulate light fluctuating 
    */
    createLeds() {
        this.leds = [];
        this.onLed = new SimpleLED(5, 0, 100, 100);
        this.leds.push(this.onLed);
        this.offLed = new SimpleLED(5, 0, 70, 30);
        this.leds.push(this.offLed);
        this.startLed = new SimpleLED(5, 360, 100, 60);
        // fill some leds bar
        for (var i = 0; i < 18; i++) {
            this.addr18Leds[i] = random(this.leds);
        }
        for (var i = 0; i < 16; i++) {
            this.data16Leds[i] = random(this.leds);
        }
    }


    /*
     to simulate slower changes based on frames 
     and leaving more significant mor changing 
    */
    randomizeLeds(someArray, byFrames = 10) {
        if (frameCount % byFrames == 0) {
            var max = floor(random(someArray.length));
            for (var i = 0; i <= max; i++) {
                someArray[i] = random(this.leds);
            }
        }
    }






}//class pdp 


/*
  utilitary class to keep colors value of leds
*/


class SimpleLED {
    constructor(size, h, s, b) {
        this.size = size;
        this.hue = h;
        this.saturation = s;
        this.brightness = b;
    }

    draw() {
        push();
        colorMode(HSB);
        var c = color(this.hue, this.saturation, this.brightness);
        fill(c);
        noStroke();
        circle(0, 0, this.size);
        pop();
    }

    // with rectangle 
    drawInContext() {
        push();
        stroke(70);
        noFill();
        strokeWeight(1);
        translate(5, 5);
        rect(0, 0, 10, 20);
        translate(5, 10);
        this.draw();
        translate(10, 0);
        pop();
    }
}
















