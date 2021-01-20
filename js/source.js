//distributes first 28 cards into board array
function deal() {
  for (var i = 0; i < 7; i++) {
    board["col" + i] = board.deck.splice(0, i + 1);
  }
}

//logic that cycles through shuffled deck
function cycle() {
  deselect();
  // if board.deck is empty, flip cards
  if (board.deck.length === 0) {
    // img state: deck moves from empty to card back
    board.deck = board.drawn.reverse();
    board.drawn = [];
  } else {
    board.drawn.push(board.deck.pop());
  }
  deckImg();
  drawnImg();
  flippedImg();
  addClick();
}

function onClick() {
  // set start info
  if (startNum === false) {
    startNum = $(this).data("cardnum");
    startArr = $(this).parent().attr("class");
    moveSize = board[startArr].length - board[startArr].indexOf(startNum);
    // Fix the drawn pile error
    if (startArr === "drawn" && board.drawn.length != 0) {
      startNum = board.drawn[board.drawn.length - 1];
    }
    //When no cards are in selected array
    if (board[startArr].length === 0) {
      deselect();
      return;
    }
    //Create img indicating selection
    // Add box shadow to selection
    selectImg(this);
    //set target and execute
  } else {
    if (this.dataset.cardnum === "0") {
      targetNum = 0;
    } else {
      targetNum = parseInt(this.getAttribute("data-cardnum")) || -1;
    }
    targetArr = $(this).parent().attr("class");
    execute();
  }
}

function moveCard() {
  //Can only move 1 card from drawn array
  if (startArr === "drawn") {
    moveSize = 1;
  }
  //Can only target top card || card is not King
  if (
    board[targetArr].length !== board[targetArr].indexOf(targetNum) + 1 ||
    (cards[startNum].value !== 13 && board[targetArr].length === 0)
  ) {
    //Can move King to empty spot on board
  } else if (cards[startNum].value === 13 && board[targetArr].length === 0) {
    //this removes and stores end of startArr based off moveSize
    var shiftedArr = board[startArr].splice(-moveSize);
    board[targetArr] = board[targetArr].concat(shiftedArr);
    addImg();
    rmvImg();
    moveCounter();
  } else if (
    startArr === "hearts" ||
    startArr === "diamonds" ||
    startArr === "spades" ||
    (startArr === "clubs" &&
      cards[startNum].color !== cards[targetNum].color &&
      cards[startNum].value + 1 === cards[targetNum].value)
  ) {
    board[targetArr].push(board[startArr].pop());
    addImg();
    moveCounter();
    //move card on top of card with alt color && move card on top of card with +1 higher value
  } else if (
    cards[startNum].color !== cards[targetNum].color &&
    cards[startNum].value + 1 === cards[targetNum].value
  ) {
    var shiftedArr = board[startArr].splice(-moveSize);
    board[targetArr] = board[targetArr].concat(shiftedArr);
    addImg();
    rmvImg();
    moveCounter();
    //move card from suits to columns
  } else {
    return;
  }
}

function moveSuit() {
  //Logic for when suits do not match || not an Ace
  if (
    cards[startNum].suit !== targetArr ||
    (cards[startNum].value !== 1 && board[targetArr].length === 0)
  ) {
    return;
    //Logic to add new cards || accept Aces
  } else if (
    startNum === targetNum + 1 ||
    (cards[startNum].value === 1 && board[targetArr].length === 0)
  ) {
    board[targetArr].push(board[startArr].pop());
    rmvImg();
    moveCounter();
    checkWin();
    return;
  }
}

function execute() {
  if (targetArr === "drawn") {
    //cannot move cards to drawn pile
  } else if (
    targetArr === "hearts" ||
    targetArr === "diamonds" ||
    targetArr === "spades" ||
    targetArr === "clubs"
  ) {
    moveSuit();
  } else {
    moveCard();
  }
  deselect();
  flippedImg();
  addClick();
}

function deselect() {
  startNum = false;
  startArr = false;
  targetNum = false;
  targetArr = false;
  moveSize = false;
  $(".selected").remove();
}

//EVER WATCHING LOGIC
function moveCounter() {
  moveCount++;
  $("#move-count").text(moveCount);
}

function checkWin() {
  if (
    board.hearts.length === 13 &&
    board.diamonds.length === 13 &&
    board.spades.length === 13 &&
    board.clubs.length === 13
  ) {
    $(".menu").html(
      "<h2>Winner!</h2><h4>Congrats on your well deserved and lonely victory!</h4><button id='reset'>Reset</button>"
    );
  }
}

//adds event listener to columns
function addClick() {
  $(".flipped").off("click");
  $(".flipped").click(onClick);
}
