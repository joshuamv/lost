//////////////// global vars /////////////////

var ball = {};
var canvasSize = 500;

//////////////// functions /////////////////

function setup() {
  createCanvas(canvasSize, canvasSize);
  reset();
}

function draw() {

  background(200,100);
  showCoord();

  //draw ball
  updateBall();
  noStroke();
  fill(0);
  ellipse(ball.x, ball.y, ball.r*2);

}

function updateBall() {

  var ballAI = 0.6; //0 = noise movement 1 = circle

  var xNoise = map(noise(frameCount*0.005), 0, 1, 0, canvasSize);
  var yNoise = map(noise(frameCount*0.005), 0, 1, 0, canvasSize);

  // create a changing angle for rotation
  var rotation = frameCount*0.01;
  var orbit = (cos(rotation)*110)+250;
  // console.log(orbit); /// check the current orbit to check borders
  var xBallCircle = orbit * cos(rotation)+220;
  var yBallCircle = orbit * sin(rotation)+220;

  // var distPadR = map(dist(xNoise, yNoise, xBallCircle, yBallCircle), 0, canvasSize, 0, 1); /// not sure need this


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
    background(255, 0, 100, 255);
    bitCrash();
  }

  //bound ball to window from y axis
  if (ball.x > canvasSize - ball.r || ball.x < 0 + ball.r) {
    // ball.vx *= -1;
    background(255, 0, 100, 255);
    bitCrash();
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
  ball.r = 15;
}

function windowResized() {
  resizeCanvas(canvasSize, canvasSize);

}
