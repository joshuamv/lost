
//////////////// global vars /////////////////

var ball = {};
var canvasSize = 500;
var radiusChange = 0;

//////////////// functions /////////////////

function setup() {
  createCanvas(canvasSize, canvasSize);
  reset();
}

function draw() {

  background(0,100,0,100);
  showCoord();

  //draw ball
  updateBall();
  noStroke();
  fill(0,250,0);
  ellipse(ball.x, ball.y, ball.r*2);

}

function updateBall() {

  var ballAI = 0.6; //0 = noise movement 1 = circle

  //change radius to play with 3d
  ball.r = (radiusChange + (ball.y * 0.2)) - 38;

  var xNoise = map(noise(frameCount*0.005), 0, 1, 0, canvasSize-0);
  var yNoise = map(noise(frameCount*0.005), 0, 1, 0, canvasSize-0);

  // create a changing angle for rotation
  var rotation = frameCount*0.01;
  var orbit = (cos(rotation)*110);
  // console.log(orbit); /// check the current orbit to check borders
  var xBallCircle = (orbit+200) * cos(rotation)+120;
  var yBallCircle = orbit * sin(rotation)+400;

  var xLerp = lerp(xNoise, xBallCircle, ballAI);
  var yLerp = lerp(yNoise, yBallCircle, ballAI);
  ball.x = xLerp;
  ball.y = yLerp;

  //update ball pos
  ball.x += ball.vx;
  ball.y += ball.vy;

  //bound ball to window from x axis
  if (ball.y > canvasSize - ball.r || ball.y < 0 + ball.r) {
    // ball.vy *= -1;
    // background(255, 0, 100, 255);
    // bitCrash();
  }

  //bound ball to window from y axis
  if (ball.x > canvasSize - ball.r || ball.x < 0 + ball.r) {
    // ball.vx *= -1;
    // background(255, 0, 100, 255);
    // bitCrash();
  }

}

function bitCrash(){
		text("crash", 10, 40);
}

function showCoord(){
	text(ball.x, 10, 18);
	text(ball.y, 10, 28);
}

function reset() {
  ball.x = canvasSize/2;
  ball.y = canvasSize/2;
  ball.vx = random(10,25);
  ball.vy = random(10,25);
  ball.r = radiusChange;
}

function windowResized() {
  resizeCanvas(canvasSize, canvasSize);

}
