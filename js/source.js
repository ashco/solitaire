//Selected card number
var startNum = false;
var startArr = false;
var targetNum = false;
var targetArr = false;
var moveSize;

//var targetArr;
//array of 52 cards
var cards = [];
//board object containing arrays
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
  board.col0 = board.deck.splice(0, 1); 
  board.col1 = board.deck.splice(0, 2);
  board.col2 = board.deck.splice(0, 3);
  board.col3 = board.deck.splice(0, 4);
  board.col4 = board.deck.splice(0, 5);
  board.col5 = board.deck.splice(0, 6);
  board.col6 = board.deck.splice(0, 7);
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

//BOARD STATE IMAGES
function deckImg(){
  if(board.deck.length === 0){
    $('.deck').find('img')
      .attr('src', './img/extra/card_empty.png');
  }else{
    $('.deck').find('img')
      .attr('src', './img/decks/small/deck_3.png');
  }
}

function drawnImg(){
  if(board.drawn.length === 0){
    $('.drawn').find('img')
      .attr('src', './img/extra/card_empty.png');
  }else{
    $('.drawn').find('img').removeAttr();
    $('.drawn').find('img')
      .addClass('flipped')
      .attr('src', './img/cards/card_' + cards[board.drawn[board.drawn.length-1]].suit + '_' + cards[board.drawn[board.drawn.length-1]].name + '.png')
      .attr('data-cardnum', board.drawn[board.drawn.length-1]);
  }
}

function addCard(){
  //THIS MIGHT CAUSE 1 EXTRA CARD 
  // if($('.' + targetArr).find('img').hasClass('flipped') === false){
    // $('.' + targetArr).find('img').last().attr('class', 'flipped');
  // console.log('board[targetArr].length', board[targetArr].length);
  // console.log('test', targetArr.includes('col'));
  //run when adding card to empty array
  if(board[targetArr].length === 1){
    // console.log('empty array')
    // console.log('moveSize before', moveSize);
    moveSize = moveSize - 1;
    // console.log('moveSize after', moveSize);
  }
  //add moveSize number of img for flippedImg to transform
  for(var i = 0; i < moveSize; i++){
    $('.' + targetArr).append('<img class="flipped">');
  }
}

function rmvCard(){
  // console.log('rmvCard FNC');
  if(startArr === 'drawn'){
    return;
  //run when column now has no cards
  }else if(board[startArr].length === 0){
    $('.' + startArr).find('img').remove()
    $('.' + startArr).append('<img class="flipped" src=".img/extra/card_empty.png">');
    return;
  //run when taking all .flipped cards out of array
  }else{
  //logic to determine how many card imgs to remove
    // console.log('rmvCard else trigger')
    for(var i = 0; i < moveSize; i++){
      // console.log('i', i)
      $('.' + startArr).find('img:nth-last-child(2)').remove();
      $('.' + startArr).find('img:nth-last-child(2)').addClass('flipped');
    }
    // if($('.' + startArr).find('img').hasClass('flipped') === false){
    //   $('.' + startArr).find('img').last().attr('class', 'flipped');
  }
}

function flippedImg(){
  for(var stack in board){
    //deck img
    if(stack === 'deck'){
    //empty arrays  
    }else if(board[stack].length === 0){
      $('.' + stack).find('img').last()
        .attr('src', './img/extra/card_empty.png');
    }
  
    //WIP
    //suits and columns
    //NEED TO CHANGE TO HIT ALL FLIPPED CARDS IN COLS
    

    else{
      var flipList = $('.' + stack).find('img.flipped');
      var numToFlip = flipList.length;
      var flipArr = board[stack].slice(-numToFlip);

      // console.log('flipList', flipList);
      // console.log('numToFlip', numToFlip);
      // console.log('List', board[stack]);
      // console.log('flipArr', flipArr);


      for(var i = 0; i < numToFlip; i++){
        $(flipList[i])
          .attr('src', './img/cards/card_' + cards[flipArr[i]].suit + '_' + cards[flipArr[i]].name + '.png')
          .attr('data-cardnum', flipArr[i]);
      }
    }
  }  

      // $(flipList)
      //   .attr('src', './img/cards/card_' + cards[(board[stack][board[stack].length-1])].suit + '_' + cards[(board[stack][board[stack].length-1])].name + '.png')
      //   .attr('data-cardnum', board[stack][board[stack].length-1]);



      
      // $('.' + stack).find('img').last()
      //   .attr('class', 'flipped')
      //   .attr('src', './img/cards/card_' + cards[(board[stack][board[stack].length-1])].suit + '_' + cards[(board[stack][board[stack].length-1])].name + '.png')
      //   .attr('data-cardnum', board[stack][board[stack].length-1]);







}

function move(){
  //set start info
  if(startNum === false){
    //assign variables

    startNum = $(this).data('cardnum');
    startArr = $(this).parent().attr('class');
    moveSize = board[startArr].length - board[startArr].indexOf(startNum);

    //Fix the drawn pile error
    if(startArr === 'drawn' && board.drawn.length != 0){
      startNum = board.drawn[board.drawn.length - 1];
    }

    // console.log('startNum', startNum);
    // console.log('startArr', startArr);

    //No cards in selected array
    if(board[startArr].length === 0){
      deselect();
    //Create img to indicate selection
    }else{
      var selectImg = $('<img>');
      selectImg.addClass('selected').attr('src', './img/extra/card_selected.png');
      $(this).parent().append(selectImg);
    }
  //set target info
  }else{
    console.log('Clicked targetNum:', $(this));
    targetNum = $(this).data('cardnum') || -1;
    targetArr = $(this).parent().attr('class');
    //cannot move cards to drawn pile
    if(targetArr === 'drawn'){
      // console.log('cannot move cards into drawn pile');
    }else if(targetArr === 'hearts' || targetArr === 'diamonds' || targetArr === 'spades' || targetArr === 'clubs'){
      moveSuit();
    }else{
      moveCard();
    }
    //run to reset selection process after execute and add click listeners to updated board state
    // console.log('targetNum', targetNum);
    // console.log('targetArr', targetArr);

    deselect();
    // topImg();
    flippedImg();
    addClick();
  }
}

function moveCard(){
  console.log('-----------START-----------');
  console.log('board[startArr] before', board[startArr]);
  console.log('board[targetArr] before', board[targetArr]);
  
  //Can only move 
  if(startArr === 'drawn'){
    // console.log('startArr is', startArr);
    moveSize = 1;
  }
  // console.log('moveSize is:', moveSize);
  
  // console.log('target array length is:', board[targetArr].length);
  // console.log('target card position in array is:', board[targetArr].indexOf(targetNum));
  //Can only target top card || card is not King
  if(board[targetArr].length !== board[targetArr].indexOf(targetNum) + 1 || cards[startNum].value !== 13 && board[targetArr].length === 0){
    console.log('NO MOVE: can only target top card / card is not king');
  //Can move King to empty spot on board
  }else if(cards[startNum].value === 13 && board[targetArr].length === 0){
    //Logic to move card array over
    // board[targetArr].push(board[startArr].pop());

    //WORK IN PROGRESS 

    //this removes and stores end of startArr based off moveSize
    var shiftedArr = board[startArr].splice(-moveSize);
    //this appends shiftedArr to end of targetArr
    board[targetArr] = board[targetArr].concat(shiftedArr);
    // console.log('shiftedArr :', shiftedArr);  







    addCard();
    rmvCard();
    // console.log('MOVE: king card added to empty array!');
  //move card on top of card with alt color && move card on top of card with +1 higher value 
  }else if(cards[startNum].color !== cards[targetNum].color && (cards[startNum]).value + 1 === (cards[targetNum]).value){
    //Logic to move card array over
    // board[targetArr].push(board[startArr].pop());

    //WORK IN PROGRESS


    //this removes and stores end of startArr based off moveSize
    var shiftedArr = board[startArr].splice(-moveSize);
    //this appends shiftedArr to end of targetArr
    board[targetArr] = board[targetArr].concat(shiftedArr);
    // console.log('shiftedArr :', shiftedArr); 


    addCard();
    rmvCard();
    // console.log('MOVE');
  //move card from suits to columns
  }else if(startArr === 'hearts' || startArr === 'diamonds' || startArr === 'spades' || startArr === 'clubs' 
  && cards[startNum].color !== cards[targetNum].color 
  && cards[startNum].value + 1 === (cards[targetNum]).value){

    // board[targetArr].push(board[startArr].pop());

    //WORK IN PROGRESS

    //this removes and stores end of startArr based off moveSize
    var shiftedArr = board[startArr].splice(-moveSize);
    //this appends shiftedArr to end of targetArr
    board[targetArr] = board[targetArr].concat(shiftedArr);
    // console.log('shiftedArr :', shiftedArr); 

    
    addCard();
  }else{
    console.log('NO MOVE')
  }
  console.log('board[startArr] after', board[startArr]);
  console.log('board[targetArr] after', board[targetArr]);
}


function moveSuit(){
  // console.log('moveSuit');
  //Logic for when suits do not match
  if(cards[startNum].suit !== targetArr || cards[startNum].value !== 1 
  && board[targetArr].length === 0){
    // console.log('not an Ace / suits dont match');
    return;
  //Logic to accept Aces
  }else if(cards[startNum].value === 1 
  && board[targetArr].length === 0){
    board[targetArr].push(board[startArr].pop());
    rmvCard();
    // console.log('Added Ace');
    return;
  //Logic to add new cards
  }else if((cards[startNum]).value === (cards[targetNum].value+1)){
    board[targetArr].push(board[startArr].pop());
    rmvCard();
    // console.log('Added suit');
    return;
  }else{
    // console.log('card is not 1+ in value');
  }
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
  // topImg();
  addClick();
  flippedImg();
}

init();