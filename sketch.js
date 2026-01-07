var inc = fxrandRange(1, 5, 0.1);
var scl = fxrandRange(70, 150, 1);
var magv = fxrandRange(0.5, 10, 0.1);
var cols, rows;
var fr;
var zoff = 0;
var particles = [];
var particles2 = [];
var flowfield;
var magv;
var cr = fxrandRange(10, 200, 1);
var dr = fxrandRange(107, 171, 1);
//var cg = random(0, 255);
var cg = fxrandRange(222, 255, 1);
var cb = fxrandRange(200, 255, 1);
var indexk = 0;
var mes1a = fxrandRange(0.1, 4, 0.1);
var mes2a = fxrandRange(0.1, 8, 0.1);
var mes1b = fxrandRange(2, 4, 0.1);
var mes2b = fxrandRange(2, 4, 0.1);
var sw1 = fxrandRange(0.1, 0.11, 0.1);

function setup() {
  createCanvas(windowWidth, windowHeight);

  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  fr = createP("");
  flowfield = new Array(cols * rows);
  for (i = 0; i < 1000; i++) {
    particles[i] = new Particle(255, 255, 255, fxrand() * i, fxrand() * i);
  }
  for (i = 0; i < 100; i++) {
    particles2[i] = new Particle2(
      dr,
      cg,
      cb,
      fxrand() * i * mes1a + windowWidth / 2,
      fxrand() * i * mes2a + windowHeight / 2,
      sw1,
      3
    );
  }
  background(0);
}

function draw() {
  if (indexk > 150) {
    noLoop();
  }
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      flowfield[index] = v;
      var angle = fxrand() * xoff;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(magv);
      xoff += inc;
      stroke(0, 130);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(0.1);
      // line(0, 0, scl, 0);
      // pop(); //fill(r);

      //rect(scl * x, scl * y, scl, scl);
    }
    yoff += inc;
    zoff += 0.0008;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  for (var i = 0; i < particles2.length; i++) {
    particles2[i].follow(flowfield);
    particles2[i].update();
    particles2[i].edges();
    particles2[i].show();
  }
  push();
  rectMode(RADIUS);
  fill(0, 1 * sin(millis() * 1000));
  noStroke();
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  pop();
  indexk = indexk + 1;
  //console.log(indexk);
}
function windowResized() {
  loop();
  indexk = 0;
  resizeCanvas(windowWidth, windowHeight);

  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  //fr = createP("");
  flowfield = new Array(cols * rows);

  for (i = 0; i < 1000; i++) {
    particles[i] = new Particle(255, 255, 255, fxrand() * i, fxrand() * i);
  }
  for (i = 0; i < 100; i++) {
    particles2[i] = new Particle2(
      dr,
      cg,
      cb,
      fxrand() * i * mes1a + windowWidth / 2,
      fxrand() * i * mes2a + windowHeight / 2,
      sw1,
      3
    );
  }
  push();
  noStroke();
  background(0);
  rectMode(RADIUS);
  fill(0);
  //fill(alpha(50));
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );

  rectMode(RADIUS);
  fill(0, 1 * sin(millis() * 1000));
  noStroke();
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  pop();
}

function fxrandRange(min, max, step) {
  value = Math.round((fxrand() * (max - min)) / step);
  return value * step + min;
}

window.$fxhashFeatures = {
  Illumination: cg,
  Magnificence: magv,
  Wisdom: inc,
  Truth: scl,
};
