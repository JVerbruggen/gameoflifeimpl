const height = 75;
const width = 75;
const viewWidth = 750;
const viewHeight = 750;

const interval = 4;

const boxWidth = viewWidth / width;
const boxHeight = viewHeight / height;

var space = [];

var playButton;
var pauseButton;

var paused = true;

var mouseHoveringOverX = 0;
var mouseHoveringOverY = 0;


function initSpace(){
  space = getNewSpace(width, height);
}

function setSpaceValue(x, y, value){
  if(!inBounds(x,y)) return;
  space[x][y] = value;
}

function getSpaceValue(x, y){
  return space[x][y];
}

function setup() {
  // put setup code here
  initSpace();
  createCanvas(viewWidth, viewHeight);

  playButton = createButton('play');
  playButton.position(viewWidth, 0);
  playButton.mousePressed(playGame);

  pauseButton = createButton('pause');
  pauseButton.position(viewWidth, 25);
  pauseButton.mousePressed(pauseGame);
}

function playGame() {
  paused = false;
}

function pauseGame() {
  paused = true;
}

function draw() {
  // put drawing code here
  updateSpace();

  drawSpace();
  highlightBox();
}

function drawBox(x,y,value){
  stroke(255);
  fill(map(value,0.0,1.0,240  ,0));
  rect(x*boxWidth,y*boxHeight,boxWidth,boxHeight);
}

function drawRGBBox(x,y,r,g,b){
  stroke(255);
  fill(r,g,b);
  rect(x*boxWidth,y*boxHeight,boxWidth,boxHeight);
}

function highlightBox(){
  mouseHoveringOverX = parseInt(mouseX / boxWidth);
  mouseHoveringOverY = parseInt(mouseY / boxHeight);

  drawRGBBox(mouseHoveringOverX,mouseHoveringOverY,255,50,50);

  if(mouseIsPressed === true){
    let fillingVal;
    if(mouseButton === LEFT){
      fillingVal = 1;
    }else{
      fillingVal = 0;
    }

    setSpaceValue(mouseHoveringOverX, mouseHoveringOverY, fillingVal);
  }
}

function drawSpace() {
  for(let x = 0; x < space.length; x++){
    let ys = space[x];
    for(let y = 0; y < ys.length; y++){
      let value = getSpaceValue(x,y);
      drawBox(x,y,value);
    }
  }
}

var counter = interval;
function updateSpace(){
  if(paused) return;

  counter -= 1;
  if(counter > 0) return;
  counter = interval;

  // actual update
  doCycle();
}

function doCycle(){
  let newspace = [];
  for(let x = 0; x < width; x++){
    let temp = [];
    for(let y = 0; y < height; y++){
      let val = getSpaceValue(x,y);
      let valuesAround = getValuesAround(x,y);
      
      let acc = 0;
      for(let vI = 0; vI < valuesAround.length; vI++){
        acc += valuesAround[vI];
      }
    
      let newVal = 0;
      if(val == 0){
        if(acc == 3){
          newVal = 1;
        }
      }else{
        if(acc == 2 || acc == 3){
          newVal = 1;
        }
      }

      temp.push(newVal);
    }
    newspace.push(temp);
  }

  space = newspace;
}

function inBounds(x,y){
  return x >= 0 && x <= width-1 && y >= 0 && y <= height-1;
}

function pushIfExists(x,y,toArr){
  if(inBounds(x,y)){
    let val = getSpaceValue(x, y);
    toArr.push(val);
  }
}

function getValuesAround(x,y){
  let values = [];
  pushIfExists(x-1, y-1, values);
  pushIfExists(x, y-1, values);
  pushIfExists(x+1, y-1, values);

  pushIfExists(x-1, y, values);
  pushIfExists(x+1, y, values);

  pushIfExists(x-1, y+1, values);
  pushIfExists(x, y+1, values);
  pushIfExists(x+1, y+1, values);

  return values;
}