// Define the size of the canvas
let canvasWidth = 800;
let canvasHeight = 800;

// Define the size of the boxes and the number of rows and columns
let boxSize = 50;
let numRows = 4;
let numCols = 4;
let backgroundColor = 220;
let selectedBox = null;
let score = 0;
let boxes = [];
let flippedboxs = [];
let isFlipped = false;
//======================================================

//::::::::::::::::::::::::::::::::::::::::::::
function goToConfigMenu() {
  showInstructions()
  let numInput = createInput(numRows.toString(), "number");
  numInput.position(20, 30);
  //:::::::::::::::
  let restButton = createButton("Rest");
  restButton.mousePressed(function() {
    numRows = min(20, parseInt(numInput.value()));
    numCols = min(20, parseInt(numInput.value()));
    initializeGameBoard();
  });
  //::::::::::::::::::::::::::::::::::::::::
  let configButton = createButton("config")
  configButton.mousePressed(function() {
    submitButton.show();
      numInput.show();
  });
  //:::::::::::::::::::::::::::::::::::
  let submitButton = createButton("Submit");
  submitButton.position(20, 90);
  //::::::::::::::::::::::::::::::::::::
  submitButton.mousePressed(function() {
  if (numInput > 20){
    
    
  }else{
      submitButton.hide();
        numInput.hide();
        showStart()

      numRows = min(20, parseInt(numInput.value()));
      numCols = min(20, parseInt(numInput.value()));
      initializeGameBoard();
    
    }
  });
}
function showInstructions(){
  textAlign(CENTER);
  textSize(20);
  text("Instructions:", width / 2, 50);
  textSize(15);
  text("Click on two boxes to see if they match. If they do, they will disappear and you will get a point. If they don't, they will flip back over and you will lose a point.", width / 2, 100);
}

//----------------------------------------------------
function checkMatch(box1, box2) {
  if (box1.emoji == box2.emoji) {
    box1.match();
    box2.match();
    score++;
  } else {
    box1.deselect();
    box2.deselect();
    score--;
  }
  selectedBox = null;
}
//-------------------------------------------------
function initializeGameBoard() {
  // Initialize game board with random emojis
  let emojis = shuffle(["😀", "😂", "😍", "🤔", "🤑", "🤩", "🤗", "🤭"]);
  let emojiIndex = 0;
  let boxSize = min(width / numCols, height / numRows);
  boxes = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let x = j * boxSize;
      let y = i * boxSize;
      let emoji = emojis[emojiIndex];
      emojiIndex++;
      if (emojiIndex >= emojis.length) {
        emojiIndex = 0;
      }
      //::::::::::::::::::::::::::::::
      let box = new Box(x, y, boxSize, emoji);
      boxes.push(box);
    }
  }
  score = 0;
}
//----------------------------------------------------
function setup() {
  createCanvas(400, 450);
  goToConfigMenu();
}
function showStart(){
  let startButton = createButton("start");
  startButton.mousePressed(function(){
    startButton.hide()
  });
}
  
                                                   
//-----------------------------------
function draw() {
  background(backgroundColor);
  
  // Draw score
  textAlign(RIGHT);
  textSize(20);
  fill(255);
  text(`Score: ${score}`, width - 10, height - 10);
  //::::::::::::::::::::::::::::::::::::::::::::
  textAlign(CENTER);
  textSize(30);
  text("Memory Match Game", width / 2, height-30);
  //:::::::::::::::::::::::::::::::::::::::::::::::::
  textAlign(CENTER);
  textSize(20);
  text("Select Game size:", width / 2, 20);
  
  
  // Draw boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
  if (flippedboxs.length == 2) {
    let box1 = flippedboxs[0];
    let box2 = flippedboxs[1];
     if (box1.emoji == box2.emoji) {
       
     }else {
      // no match, flip back the cards
      setTimeout(function() {
        box1.flip();
        box2.flip();
        flippedboxs = [];
      }, 1000);
    }
  }
  
}
//--------------------------------------------------
function mousePressed() {
  for (let i = 0; i < boxes.length; i++) {
    //:::::::::::::::::::::::::::::::::::::::
    if (boxes[i].contains(mouseX, mouseY) && !boxes[i].isMatched && !boxes[i].isSelected) {
          isFlipped = !isFlipped;
      if (selectedBox == null) {
        selectedBox = boxes[i];
        selectedBox.isSelected = true;
      } else {
        checkMatch(selectedBox, boxes[i]);
      }
      break;
    }
  }
}
//-----------------------------------------------------
function Box(x, y, size, emoji) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color(255);
  this.emoji = emoji;
  this.isMatched = false;
  this.isSelected = false;
//:::::::::::::::::::::::::::::
  this.show = function() {
    fill(this.color);
    stroke(0);
    rect(this.x, this.y, this.size, this.size);
    textSize(this.size / 2);
    textAlign(CENTER, CENTER);
    text(this.emoji, this.x + this.size / 2, this.y + this.size / 2);
  }
  
  this.flip = function() {
    this.faceDown = !this.faceDown;
  }

  this.contains = function(x, y) {
return (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size);
}
  
this.match = function() {
this.isMatched = true;
this.color = color(150);
}

this.deselect = function() {
this.isSelected = false;
}
}
//================================================