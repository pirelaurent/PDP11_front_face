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
        this.createLeds();
    }

    draw() {
        fill(this.background);
        stroke(50);
        // set a 3D box 
        
            push();
            translate(this.width / 2, this.height / 2, -this.pdp_d / 2);
            box(this.width, this.height, this.pdp_d);
            pop();
        
        // border 
        rect(0, 0, this.width, this.height);

        // text font and default if not loaded
        if( this.helvetica) textFont(this.helvetica);
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
        translate(20, 9, 0);
        rect(0, 0, 400, 21);
        this.machineName();
        stroke(this.traitColor);
        fill(this.brightRose);
        rect(0, 20, 400, 10);
        pop();
    }

    // ---------- write machine name & serial number 
    machineName() {
        push();
        textSize(16);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);

        translate(20, 0, 0);
        for (var i = 0; i < this.name.length; i++) {
            var c = this.name.charAt(i);
            fill(this.textColor);
            text(c, 8, 9);
            noFill();
            rect(0, 0, 15, 20);
            translate(15, 0, 0);
        }
        translate(10, 0, 0);
        // pdp special letters
        push();
        translate(12, 9, 0);
        scale(0.18);
        this.drawPDPLetters();
        pop();
        //
        translate(40, 0, 0);
        fill(this.textColor);
        textAlign(LEFT, CENTER);
        textStyle(NORMAL);
        textSize(14);
        text(this.serialNb, 0, 9);
        pop();
    }

    //--------------------- adress bar 
    adress_bar() {
        push();
        strokeWeight(2);
        stroke(this.traitColor);
        translate(60, 50, 0);
        for (var hb = 0; hb < 6; hb++) {
            fill(this.magenta);
            if (hb % 2 == 1) fill(this.brightRose);
            rect(0, 0, 40, 5);
            this.drawLeds(3);
            translate(40, 0, 0);
        }

        //2 blocks of 2 leds on right avec 2 led chacun

        translate(20, 0, 0);
        this.drawLeds(1, this.offLed);
        translate(10, 0, 0);
        this.drawLeds(1, this.onLed);
        translate(-10, 0, 0);
        fill(this.magenta);
        rect(0, 0, 30, 5);
        translate(30, 0, 0);
        this.drawLeds(2, this.onLed);
        fill(this.brightRose);
        rect(0, 0, 30, 5);

        // more on right a block splited 

        translate(35, 0, 0);
        this.drawLeds(1);
        fill(this.magenta);
        rect(0, 0, 15, 5);
        translate(10, 0, 0);
        this.drawLeds(1, this.onLed);
        translate(5, 0, 0);
        fill(this.brightRose);
        rect(0, 0, 15, 5);
        pop();

        // add a text on top of led's bar 

        push();
        translate(200, 47, 0);
        textSize(5);
        textAlign(CENTER);
        stroke(this.textColor);
        fill(this.textColor);
        text('ADDRESS REGISTER', 0, 0);

        // add text 
        textSize(5);
        translate(135,0,0);
        text('RUN', 0, 0);
        translate(30,0,0);
        text('BUS', 0, 0);
        translate(27,0,0);
        text('FETCH', 0, 0);
        translate(18,0,0);
        text('EXEC', 0, 0);





        pop();
    }

    //----------------------------- data bar 

    dataBar() {
        push();
        stroke(this.traitColor);
        // one alone 
        translate(80, 90, 0);
        this.drawLeds(1);
        fill(this.magenta);
        rect(0, 0, 20, 5);

        // serie of 5 groups of 3 leds 

        translate(20, 0, 0);
        for (var hb = 1; hb <= 5; hb++) {
            fill(this.magenta);
            if (hb % 2 == 1) fill(this.brightRose);
            this.drawLeds(3);
            rect(0, 0, 40, 5);
            translate(40, 0, 0);
        }
        // 2 more on right 

        translate(20, 0, 0);

        this.drawLeds(2, this.offLed);
        fill(this.magenta);
        rect(0, 0, 30, 5);
        translate(30, 0, 0);
        this.drawLeds(2, this.offLed);
        fill(this.brightRose);
        rect(0, 0, 30, 5);

        // more on right 

        translate(35, 0, 0);

        this.drawLeds(1, this.onLed);
        translate(10, 0, 0);
        this.drawLeds(1, this.startLed);
        translate(-10, 0, 0);
        fill(this.magenta);
        rect(0, 0, 30, 5);

        // add data text on top of data bar

        pop();
        push();
        translate(200, 88, 0);
        textSize(6);
        textAlign(CENTER);
        fill(this.textColor);
        text('DATA', 0, 0);
         // add text 
         textSize(5);
         translate(134,0,0);
         text('SOURCE', 0, 0);
         translate(31,0,0);
         text('DESTINATION', 0, 0);
         translate(35,0,0);
         text('ADDRESS', 0, 0);
        pop();
    }

    //---------------------------------- lower bar with switches 

    lowerBar() {
        // set origin 
        push();
        translate(19, 130, 0);

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

        translate(40, 0, 0);
        fill(this.brightRose);
        stroke(this.traitColor);
        rect(0, 0, 240, 4);
        translate(0, 4, 0);
        fill(this.magenta);
        rect(0, 0, 240, 9);
        noFill();
        rect(0, 9, 240, 20);

        // write each bit number 

        textSize(6);
        textAlign(CENTER, BOTTOM);
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 3; j++) {
                rect(0, 0, 40 / 3, 9);
                fill(this.textColor);
                text(17 - (i * 3 + j), 20 / 3, 8);
                noFill();
                translate(40 / 3, 0, 0);
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

    //-----------------------  draw switches under bit number. all down 

    draw_switches_left_bar() {
        push();
        translate(60, 145, 0);
        var aColor = this.magenta;
        for (var i = 0; i < 6; i++) {
            var aColor = this.magenta;
            if (i % 2 == 0) aColor = this.brightRose;
            for (var j = 0; j < 3; j++) {
                this.switch_down(aColor);
                translate(240 / 18, 0, 0);
            }
        }
        pop();
    }

    // ------- instruction bar to control PDP 
    // LOAD    EXAM    CONT  ENABLE    S-INST          START    DEP
    // ADDR                  HALT      S-CYCLE 

    controlBar() {
        var tSize = 4;
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
            rect(0, 0, 45 / 3, 13);
            // text inside 
            textAlign(LEFT, TOP);
            fill(color(170));
            stroke(this.textColor);
            if (i==0){
                text('LOAD',1,2);
                text('ADDR',1,8);
                line(1,7,11,7);
            };
            if (i==3){
                text('ENABLE',1,2);
                text(' HALT',1,8);
                line(1,7,11,7);   
            };
            if (i==4){
                text('S-INST',1,2);
                textSize(tSize - 0.7);
                text('S-CYCLE',1,8);
                textSize(tSize);
                line(1,7,11,7);   
            };
            if ((i==1)||(i==2)||i==5||i==6)text(labels[i], 1, 5); 

            

            // switches under instruction . All up but 5th

            push();
            translate(1, 14, 1);
            if (i == 5) this.switch_half_down(current);
            else this.switch_up(current);
            pop();
            translate(45 / 3, 0, 0);
        }

        // last isolated control

        translate(5, 0, 0);
        noFill();
        rect(0, 0, 45 / 3, 33);
        fill(this.magenta);
        rect(0, 0, 45 / 3, 13);
        fill(this.textColor);
        stroke(this.textColor);
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
        beginShape(LINES);
        vertex(0, 0);
        vertex(10, 0);
        vertex(10, 3);
        vertex(0, 3);
        endShape();
        fill(color2);
        beginShape(LINES);
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
        beginShape(LINES);
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
        beginShape(LINES);
        vertex(0, 0);
        vertex(w, 0);
        vertex(w, h);
        vertex(6, h);
        vertex(0, 0);
        endShape();
        // small reflect on top 
        fill(color3);
        beginShape(LINES);
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
        beginShape(LINES);
        vertex(1, 0);
        vertex(w, 0);
        vertex(w - 1, h);
        vertex(2, h);
        vertex(1, 0);
        endShape();


        // small reflect on top 
        fill(color1);
        beginShape(LINES);
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
        this.leds.push(new SimpleLED(5, 355, 100, 80));
        this.leds.push(new SimpleLED(5, 350, 100, 60));
        this.leds.push(new SimpleLED(5, 350, 70, 70));
        this.leds.push(new SimpleLED(5, 10, 70, 60));
        this.leds.push(new SimpleLED(5, 340, 70, 40));
        this.leds.push(new SimpleLED(5, 0, 50, 40));
        this.leds.push(new SimpleLED(5, 10, 70, 40));
        this.leds.push(new SimpleLED(5, 340, 70, 20));
        this.onLed = new SimpleLED(5, 0, 100, 100);
        this.offLed = new SimpleLED(5, 350, 70, 50);
    }


    /*
     draw n leds. 
     if someLeds is not specified, take randomly a led in leds array
    */

    drawLeds(nb, someLed) {
        var aLed = someLed;
        var randomChoice = (typeof (aLed) == 'undefined');
        push();
        for (var led = 0; led < nb; led++) {
            stroke(70);
            noFill();
            strokeWeight(1);
            push();
            translate(5, 5);
            rect(0, 0, 10, 20);
            translate(5, 10, 0);
            if (randomChoice) {
                aLed = random(this.leds);
            }
            aLed.draw();
            pop();
            translate(10, 0, 0);
        }
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
        noFill();
        strokeWeight(1);
        this.drawP();
        translate(50, 0, 0);
        this.drawD();
        translate(51, 0, 0);
        this.drawP();
        pop();
    }


    // letter p 

    drawP() {
        push();
        fill(this.magenta);
        ellipse(0, 0, 28);
        ellipse(0, 0, 50);
        translate(-26, -25, 4);
        noStroke();
        rect(0, 0, 10, 70);
        stroke('grey');
        line(0, 0, 0, 70);
        line(0, 0, 10, 0);
        line(0, 70, 10, 70);
        line(10, 70, 10, 45);
        line(10, 0, 10, 5); ambientMaterial.or
        pop();
    }
    // letter d

    drawD() {
        push();
        fill(this.magenta);
        ellipse(0, 0, 28);
        ellipse(0, 0, 50);
        translate(25, 25, 4);
        noStroke();
        rect(0, 0, -10, -70);
        stroke('grey');
        line(0, 0, 0, -70);
        line(0, -70, -10, -70);
        line(-10, -70, -10, -45);
        line(0, 0, -10, 0);
        line(-10, 0, -10, -5)
        pop();
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
        stroke(c);
        circle(0, 0, this.size);
        pop();
    }
}
















