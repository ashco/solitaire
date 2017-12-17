var cards = [];
var board = {
  deck: [],
  drawn: [],
  col0: [],
  col1: [],
  col2: [],
  col3: [],
  col4: [],
  col5: [],
  col6: [],  
  hearts: [],
  diamonds: [],
  spades: [],
  clubs: []
};
var startNum = false;
var startArr = false;
var targetNum = false;
var targetArr = false;
var moveSize;
var moveCount = 0;

//INITIAL BOARD SETUP
//generates card object attributess
function card(value, name, suit, color){
  this.value = value;
  this.name = name;
  this.suit = suit;
  this.color = color;
}

//generates 52 card deck list
function deckCreate(){
  this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  this.suits = ['hearts','diamonds','spades','clubs'];
  this.color = ['Black', 'Red'];
  for(var s = 0; s < this.suits.length; s++){
    for(var n = 0; n < this.names.length; n++){
      if(s > 1){
        cards.push(new card( n+1, this.names[n], this.suits[s], this.color[0]));
      }else{
        cards.push(new card( n+1, this.names[n], this.suits[s], this.color[1]));
      }
    }
  }  
  return cards;
}

//creates 52 card order array
function shuffle(){
  for(var i = 0; i < 52; i++){
    var cardSelect = (Math.floor(Math.random() * 52));
    //ensures shuffle function runs until 52 unique values are chosen
    if(board.deck.includes(cardSelect)){
      i-=1;
    }else{
      board.deck.push(cardSelect);
    }
  }
}

//distributes first 28 cards into board array
function deal(){
  for(var i = 0; i < 7; i++){
    board['col'+i] = board.deck.splice(0, (i + 1)); 
  }
}

//logic that cycles through shuffled deck
function cycle(){
  deselect();
  //if board.deck is empty, flip cards
  if(board.deck.length === 0){
    //img state: deck moves from empty to card back
    board.deck = board.drawn.reverse();
    board.drawn = [];
  }else{
    board.drawn.push(board.deck.pop());
  }
  //update images of deck and drawn
  deckImg();
  drawnImg();
  flippedImg();
  addClick();
}

function move(){
  //set start info
  if(startNum === false){
    startNum = $(this).data('cardnum');
    startArr = $(this).parent().attr('class');
    moveSize = board[startArr].length - board[startArr].indexOf(startNum);
    //Fix the drawn pile error
    if(startArr === 'drawn' && board.drawn.length != 0){
      startNum = board.drawn[board.drawn.length - 1];
    }
    //No cards in selected array
    if(board[startArr].length === 0){
      deselect();
    //Create img to indicate selection
    }else{
      var selectImg = $('<img>');
      var selectRow = (board[startArr].length-1)
      if(startArr === 'drawn' || startArr === 'hearts' || startArr === 'diamonds' || startArr === 'spades' || startArr === 'clubs'){
        selectRow = 0;
      }
      selectImg.addClass('row' + selectRow + ' selected').attr('src', './img/extra/card_selected_low.png');
      $(this).parent().append(selectImg);
    }
  //set target info
  }else{
    targetNum = parseInt(this.getAttribute('data-cardnum')) || -1;
    targetArr = $(this).parent().attr('class');
    if(targetArr === 'drawn'){  
      //cannot move cards to drawn pile
    }else if(targetArr === 'hearts' || targetArr === 'diamonds' || targetArr === 'spades' || targetArr === 'clubs'){
      moveSuit();
    }else{
      moveCard();
    }
    //run to reset selection process after execute and add click listeners to updated board state
    deselect();
    flippedImg();
    addClick();
  }
}

function moveCard(){
  //Can only move 1 card from drawn array 
  if(startArr === 'drawn'){
    moveSize = 1;
  }
  //Can only target top card || card is not King
  if(board[targetArr].length !== board[targetArr].indexOf(targetNum) + 1
  || cards[startNum].value !== 13 
  && board[targetArr].length === 0){
    console.log('NO MOVE: can only target top card / card is not a king');
  //Can move King to empty spot on board
  }else if(cards[startNum].value === 13 
  && board[targetArr].length === 0){
    //Logic to move card array over
    //this removes and stores end of startArr based off moveSize
    var shiftedArr = board[startArr].splice(-moveSize);
    board[targetArr] = board[targetArr].concat(shiftedArr);
    addCard();
    rmvCard();
    moveCounter();
  //move card on top of card with alt color && move card on top of card with +1 higher value 
  }else if(cards[startNum].color !== cards[targetNum].color 
  && (cards[startNum]).value + 1 === (cards[targetNum]).value){
    //this removes and stores end of startArr based off moveSize
    var shiftedArr = board[startArr].splice(-moveSize);
    board[targetArr] = board[targetArr].concat(shiftedArr);
    addCard();
    rmvCard();
    moveCounter();
  //move card from suits to columns
  }else if(startArr === 'hearts' || startArr === 'diamonds' || startArr === 'spades' || startArr === 'clubs' 
  && cards[startNum].color !== cards[targetNum].color 
  && cards[startNum].value + 1 === (cards[targetNum]).value){
    //this removes and stores end of startArr based off moveSize
    var shiftedArr = board[startArr].splice(-moveSize);
    board[targetArr] = board[targetArr].concat(shiftedArr);
    addCard();
    moveCounter();
  }else{
    console.log('NO MOVE')
  }
  // console.log('board[startArr] after', board[startArr]);
  // console.log('board[targetArr] after', board[targetArr]);
}

function moveSuit(){
  //Logic for when suits do not match or not an Ace
  if(cards[startNum].suit !== targetArr || 
  cards[startNum].value !== 1 && board[targetArr].length === 0){
    return;
  //Logic to add new cards || accept Aces
  }else if(startNum === targetNum + 1 
  || cards[startNum].value === 1 
  && board[targetArr].length === 0){
    board[targetArr].push(board[startArr].pop());
    rmvCard();
    moveCounter();
    return;
  }
}


//BOARD STATE IMAGES
function deckImg(){
  if(board.deck.length === 0){
    $('.deck').find('img')
      .attr('src', './img/extra/card_empty_green.png');
  }else{
    $('.deck').find('img')
      .attr('src', './img/decks/small/deck_3.png');
  }
}

function drawnImg(){
  if(board.drawn.length === 0){
    $('.drawn').find('img')
      .attr('src', './img/extra/card_empty_green.png');
  }else{
    $('.drawn').find('img').removeAttr();
    $('.drawn').find('img')
      .addClass('flipped')
      .attr('src', './img/cards/card_' + cards[board.drawn[board.drawn.length-1]].suit + '_' + cards[board.drawn[board.drawn.length-1]].name + '.png')
      .attr('data-cardnum', board.drawn[board.drawn.length-1]);
  }
}

function addCard(){
  //run when adding card to empty array
  if(board[targetArr].length === 1){
    moveSize = moveSize - 1;
  }
  //Calculates row index
  var rowNum = board[targetArr].indexOf(board[targetArr][board[targetArr].length-1]);
  //add moveSize number of imgs for flippedImg to transform
  for(var i = 0; i < moveSize; i++){
    $('.' + targetArr).append('<img class="row' + (rowNum - moveSize + i + 1) + ' flipped">');
  }
}

function rmvCard(){
  if(startArr === 'drawn'){
    return;
  //run when column now has no cards
  }else if(board[startArr].length === 0){
    $('.' + startArr).find('img').remove()
    $('.' + startArr).append('<img class="flipped" src="./img/extra/card_empty_green.png">');
    return;
  //run when taking all .flipped cards out of array
  }else{
  //logic to determine how many card imgs to remove
    for(var i = 0; i < moveSize; i++){
      $('.' + startArr).find('img:nth-last-child(2)').remove();
      $('.' + startArr).find('img:nth-last-child(2)').addClass('flipped');
    }
  }
}

function flippedImg(){
  for(var stack in board){
    //deck img
    if(stack === 'deck'){
    //empty arrays  
    }else if(board[stack].length === 0){
      $('.' + stack).find('img').last()
        .attr('src', './img/extra/card_empty_green.png');
    }else{
      var flipList = $('.' + stack).find('img.flipped');
      var numToFlip = flipList.length;
      var flipArr = board[stack].slice(-numToFlip);
      for(var i = 0; i < numToFlip; i++){
        $(flipList[i])
          .attr('src', './img/cards/card_' + cards[flipArr[i]].suit + '_' + cards[flipArr[i]].name + '.png')
          .attr('data-cardnum', flipArr[i]);
      }
    }
  }  
}



function moveCounter(){
  moveCount ++
  $('#move-count').text(moveCount);
}

function deselect(){
  startNum = false;
  startArr = false;
  targetNum = false; 
  targetArr = false;
  moveSize = false;
  $('.selected').remove();
}

//EVENT LISTENERS
$('.deck').click(cycle);

//adds event listener to columns
function addClick(){
  $('.flipped').off('click');
  $('.flipped').click(move);
}

//present info in console
function present(){
  console.log(board);
  flippedImg();
}

function init(){
  deckCreate();
  shuffle();
  deal();
  addClick();
  flippedImg();
}

init();