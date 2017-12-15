//Selected card number
var selected = false;
var startArr;
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
}

function moveCard(start, target, targetArr){
  //finds names of arrays that contain start/target values
  for(var area in board){
    if(board[area].indexOf(start) >= 0){
      startArr = area;
    }
  }
  // console.log('this is the TARGET length', board[targetArr].length);
  // console.log('StartArr Col is ', startArr);  
  // console.log('TargetArr Col is ', targetArr);
  // console.log('Start param  is ', start);
  // console.log('Target param  is ', target);

  //switch statement?
  if(cards[start].value !== 13 &&
  board[targetArr].length === 0){
    console.log('NO MOVE: card is not a king!');
    return;
  //Move king into empty array
  }else if(cards[start].value === 13 && 
  board[targetArr].length === 0){
    //find targets array
    board[targetArr].push(board[startArr].pop());
    addCardImg(targetArr);
    removeCardImg();
    console.log('MOVE: king card added to empty column!');
    return;
  //move card on top of card with alt color
  }else if(cards[start].color !== cards[target].color &&
  //move card on top of card with +1 higher value 
  (cards[start]).value + 1 === (cards[target]).value){
    //find targets array
    board[targetArr].push(board[startArr].pop());
    addCardImg(targetArr);
    removeCardImg();
    console.log('card moved!');
    return;
  }else{
    console.log('card cannot move');
    return;
  }
}

//logic that determines if card can be moved to sideline storage area
function moveSuit(start, target, targetArr){
  //REPEAT - can turn into function
  for(var area in board){
    if(board[area].indexOf(start) >= 0){
      startArr = area;
    }
  }
  // console.log('start is ', start, 'target is : ', target, 'startArr is: ', startArr, 'targetArr is :', targetArr);
  //start card is not same suit
  if(cards[start].suit !== targetArr){
    console.log('suit does not match!');
    return;
  }else if(cards[start].value !== 1 && board[targetArr].length === 0){
    console.log('not an Ace, idiot!');
    return;
  }else if(cards[start].value === 1 && board[targetArr].length === 0){
    board[targetArr].push(board[startArr].pop());
    addCardImg(targetArr);
    removeCardImg();
    console.log('added Ace');
    return;
  }else if((cards[start]).value === (cards[target].value+1)){
    board[targetArr].push(board[startArr].pop());
    removeCardImg();
    console.log('stored suit');
    return;
  }else{
    console.log('card is not 1+ in value');
  }
}

//BOARD STATE IMAGES
function deckImg(){
  if(board.deck.length === 0){
    $('.deck').find('img').attr('src', './img/extra/card_empty.png');
  }else{
    $('.deck').find('img').attr('src', './img/decks/small/deck_3.png');
  }
}

function drawnImg(){
  if(board.drawn.length === 0){
    $('.drawn').find('img').attr('src', './img/extra/card_empty.png');
  }else{
    $('.drawn').find('img').attr('src', './img/cards/card_' + cards[board.drawn[board.drawn.length-1]].suit + '_' + cards[board.drawn[board.drawn.length-1]].name + '.png');
  }
}

function topImg(){
  for(var stack in board){
    if(board[stack].length === 0){
      $('.' + stack).find('img').last().attr('src', './img/extra/card_empty.png');
    }else if(stack === 'deck'){
      $('.' + stack).find('img').attr('src', './img/decks/small/deck_3.png'); 
    }else{    
      $('.' + stack).find('img').last().attr('class', 'flipped').attr('src', './img/cards/card_' + cards[(board[stack][board[stack].length-1])].suit + '_' + cards[(board[stack][board[stack].length-1])].name + '.png');
    }
  }  
}

function addCardImg(colName){
  if(board[colName].length === 1){
    return;
  }
  $('.' + colName).append('<img>');
}

function removeCardImg(){
  if(board[startArr].length === 0 ||
  startArr === 'drawn' ||
  startArr === 'hearts' ||
  startArr === 'diamonds' ||
  startArr === 'spades' ||
  startArr === 'clubs'){
    return;
  }
  $('.' + startArr + ' img:nth-last-child(2)').remove();
}

//determines if card is selected or not
function decider(){
  var focus = $(this).parent().attr('class');
  console.log('decider fnc: this is ', this, 'focus is', focus);
  //SELECTOR
  if(selected === false){
    //cannot select empty array
    if(board[focus].length === 0){
      console.log('no cards in column!');
    //this will update selected var with card number
    }else{
      selected = board[focus][board[focus].length-1];
      console.log('Selected: ', selected);
      //adds highlight img
      var selectImg = $('<img>');
      selectImg.addClass('selected').attr('src', './img/extra/card_selected.png');
      $(this).parent().append(selectImg);
    }
    return;
  }
  //EXECUTOR
  var target = board[focus][board[focus].length-1] || -1;
  if(focus === 'hearts' ||
  focus === 'diamonds' ||
  focus === 'spades' ||
  focus === 'clubs'){
    moveSuit(selected, target, focus);
  }else{
    moveCard(selected, target, focus);
  }
  deselect();
  topImg();
  addClick();
}

function deselect(){
  selected = false;
  $('.selected').remove();
}

//EVENT LISTENERS
$('.deck').click(cycle);

//adds event listener to columns
function addClick(){
  $('.flipped').off('click');
  $('.flipped').click(decider);
  // $('.drawn').click(decider);
  // $('.hearts').click(decider);
  // $('.diamonds').click(decider);
  // $('.spades').click(decider);
  // $('.clubs').click(decider);
}

  // console.log($('.flipped'));

    // $('.col'+i).click(decider);
    // adds img to column, may need to move function somewhere else
    // $('.col'+i).click(cardImgAdd);
    // console.log('img added');


//present info in console
function present(){
  console.log(cards);
  console.log(board);
  console.log('Cards in board.deck: ', board.deck);
  console.log('Cards in board.drawn: ', board.drawn);
  topImg();
}

function init(){
  deckCreate();
  shuffle();
  deal();
  topImg();
  addClick();
}

init();
present();