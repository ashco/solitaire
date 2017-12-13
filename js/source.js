//Selected card
var selected
//array of 52 cards
var cards = [];
//array of 52 ran gen card values 
var deckArray = [];
var drawnArray = [];
//suit object holder
var suitState = {
  heartsArray: ['Hearts'],
  diamondsArray: ['Diamonds'],
  spadesArray: ['Spades'],
  clubsArray: ['Clubs']
};

//board object and column arrays
var boardState = {
  col0: [],
  col1: [],
  col2: [],
  col3: [],
  col4: [],
  col5: [],
  col6: []  
};

//generates card object attributes
function card(value, name, suit, color){
  this.value = value;
  this.name = name;
  this.suit = suit;
  this.color = color;
}

//generates 52 card deck list
function deck(){
  this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  this.suits = ['Hearts','Diamonds','Spades','Clubs'];
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
    if(deckArray.includes(cardSelect)){
      i-=1;
    }else{
      deckArray.push(cardSelect);
    }
  }
}

//distributes first 28 cards into board array
function deal(){
  boardState.col0 = deckArray.splice(0, 1); 
  boardState.col1 = deckArray.splice(0, 2);
  boardState.col2 = deckArray.splice(0, 3);
  boardState.col3 = deckArray.splice(0, 4);
  boardState.col4 = deckArray.splice(0, 5);
  boardState.col5 = deckArray.splice(0, 6);
  boardState.col6 = deckArray.splice(0, 7);
}

function moveCard(start, target){
  //no card selected
  if(start.length === 0){
    console.log('no card in array!');
    return ;
  //move king to empty column array 
  //add || to combine this with top if 
  }else if(cards[start[start.length-1]].value !== 13 &&
  target.length === 0){
    console.log('card is not a king!');
    return;
  }else if(cards[start[start.length-1]].value === 13 && 
  target.length === 0){
    target.push(start.pop());
    console.log('king card added to empty column!');
    return;
  //move card on top of card with alt color
  }else if(cards[start[start.length-1]].color !== cards[target[target.length-1]].color &&
  //move card on top of card with +1 higher value 
  (cards[start[start.length-1]]).value+1 === (cards[target[target.length-1]]).value){
    target.push(start.pop());
    console.log('card moved!');
    return;
  }else{
    console.log('card cannot move');
    return;
  }
}

//logic that determines if card can be moved to sideline storage area
function moveSuit(start, target){
    //no card selected
  if(start.length === 0){
    console.log('no card in array!');
    return;
  //WORK IN PROGRESS
  //start card is not same suit
  }else if(cards[start[start.length-1]].suit !== 'Hearts'){
    console.log('suit does not match!');
    return;
  }else if(cards[start[start.length-1]].value !== 1 && target.length === 0){
    target.push(start.pop());
    console.log('not an Ace, idiot!');
    return;
  }else if(cards[start[start.length-1]].value === 1 && target.length === 0){
    target.push(start.pop());
    console.log('added Ace');
    return;
  }else if((cards[start[start.length-1]]).value === (cards[target[target.length-1]].value+1)){
    target.push(start.pop());
    console.log('stored suit');
  }else{
    console.log('card is not 1+ in value');
  }
}

//logic that cycles through shuffled deck
function cycle(){
  //if deckArray is empty, flip cards
  if(deckArray.length === 0){
    //img state: deck moves from empty to card back
    deckArray = drawnArray.reverse();
    drawnArray = [];
  }else{
    drawnArray.push(deckArray.pop());
  }
  //update images of deck and drawn
  deckImg();
  drawnImg();
  // console.log('deckArray ' + deckArray);
  // console.log('drawnArray ' + drawnArray);
}

function deckImg(){
  if(deckArray.length === 0){
    $('.deck').html('<img src="./img/extra/card_empty.png">');
  }else{
    $('.deck').html('<img src="./img/decks/small/deck_3.png">');
  }
}

function drawnImg(){
  if(drawnArray.length === 0){
    $('.drawn').html('<img src="./img/extra/card_empty.png">');
  }else{
    $('.drawn').html('<img src="./img/cards/card_' + cards[drawnArray[drawnArray.length-1]].suit + '_' + cards[drawnArray[drawnArray.length-1]].name + '.png">');
  }
}

function gameStartImg(){
  for(var col in boardState){
    console.log(cards[(boardState[col][boardState[col].length-1])]);
    var topImg = $('<img>');
    topImg.attr('src', './img/cards/card_' + cards[(boardState[col][boardState[col].length-1])].suit + '_' + cards[(boardState[col][boardState[col].length-1])].name + '.png');
    $('.' + col).append(topImg);
  }  
}




//!!!Need to integrate into moveSuit function
//adds image to clicked column
function boardAddImg(){
  var addCard = $('<img>');
  addCard.attr('src', './img/decks/small/deck_3.png');
  $(this).append(addCard);
}

//Event Listeners
$('.deck').click(cycle);

//adds event listener to columns
function addColClick(){
  for(var i = 0; i < 6; i++){
    console.log('hi mom!');
    // $('.col'+i).click(boardAddImg);
  }
}

//present info in console
function present(){
  console.log(cards);
  console.log(boardState);
  console.log(suitState);
  console.log('Cards in deckArray: ', deckArray);
  console.log('Cards in drawnArray: ', drawnArray);
}

function init(){
  deck();
  shuffle();
  deal();
  addColClick();
  gameStartImg();
}

init();
present();