//Selected card number
var selected = false;
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
    if(board.deck.includes(cardSelect)){
      i-=1;
    }else{
      board.deck.push(cardSelect);
    }
  }
}

//MOVE CARDS BETWEEN ARRAYS
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

// function moveCard(start, target){
//   //no card selected
//   if(start.length === 0){
//     console.log('no card in array!');
//     return;
//   //move king to empty column array 
//   //add || to combine this with top if 
//   }else if(cards[start[start.length-1]].value !== 13 &&
//   target.length === 0){
//     console.log('card is not a king!');
//     return;
//   }else if(cards[start[start.length-1]].value === 13 && 
//   target.length === 0){
//     target.push(start.pop());
//     console.log('king card added to empty column!');
//     return;
//   //move card on top of card with alt color
//   }else if(cards[start[start.length-1]].color !== cards[target[target.length-1]].color &&
//   //move card on top of card with +1 higher value 
//   (cards[start[start.length-1]]).value+1 === (cards[target[target.length-1]]).value){
//     target.push(start.pop());
//     console.log('card moved!');
//     return;
//   }else{
//     console.log('card cannot move');
//     return;
//   }
// }


function moveCard(start, target){
  //finds names of arrays that contain start/target values
  for(var focus in board){
    if(board[focus].indexOf(start) >= 0){
      var startArr = focus;
      console.log('Start Col is ', startArr);  
    }else if(board[focus].indexOf(target) >= 0){
      var targetArr = focus;
      console.log('Target Col is ', targetArr);
    }
  }
  //switch statement?
  if(cards[start].value !== 13 &&
  target.length === 0){
    console.log('NO MOVE: card is not a king!');
    return;
  //Move king into empty array
  }else if(cards[start].value === 13 && 
  target.length === 0){
    //find targets array
    board[targetArr].push(board[startArr].pop());
    // console.log(board[targetArr]);
    console.log('MOVE: king card added to empty column!');
    return;
  //move card on top of card with alt color
  }else if(cards[start].color !== cards[target].color &&
  //move card on top of card with +1 higher value 
  (cards[start]).value+1 === (cards[target]).value){
    //find targets array
    board[targetArr].push(board[startArr].pop());
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
    // target.push(start.pop());
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
      $('.' + stack).find('img').last().attr('src', './img/cards/card_' + cards[(board[stack][board[stack].length-1])].suit + '_' + cards[(board[stack][board[stack].length-1])].name + '.png')
    }
  }  
}

//update number of card images based off of array length
// function cardImgAdd(){
//   //insert image as last element 
//   var addCard = $('<img>');
//   $(this).append(addCard);
// }

//determines if card is selected or not
function decider(){
  var focus = this;
  focus = $(focus).attr('class');
  //Selector
  if(selected === false){
    //cannot select empty array
    if(board[focus].length === 0){
      console.log('no cards in column!');
      return;
    }else{
      //this will update selected var with card number
      selected = board[focus][board[focus].length-1];
      console.log('Selected: ', selected);
      //adds highlight img
      var selectImg = $('<img>');
      selectImg.addClass('selected').attr('src', './img/extra/card_selected.png');
      $(this).append(selectImg);
    }
    return;
  }
  //Executor
  var target = board[focus][board[focus].length-1]
  console.log('executed on :', target);
  moveCard(selected, target);
  selected = false;
  $('.selected').remove();
}

// function selector(){
//   $('.selected').remove();
//   var focus = this;
//   focus = $(focus).attr('class');
//   if(board[focus].length === 0){
//     console.log('no cards in column!');
//     return;
//   //deselect if clicked twice  
//   }else if(selected === board[focus][board[focus].length-1]){
//     console.log('Nothing selected');
//     selected = false;
//     return;
//   }else{
//     //this will update selected var with card number
//     selected = board[focus][board[focus].length-1];
//     console.log('Selected: ', selected);
//     //this adds selected highlight img
//     var selectImg = $('<img>');
//     selectImg.addClass('selected').attr('src', './img/extra/card_selected.png');
//     $(this).append(selectImg);
//   }
// }




//EVENT LISTENERS
$('.deck').click(cycle);

//adds event listener to columns
function addColClick(){
  $('.drawn').click(decider);
  $('.hearts').click(decider);
  $('.diamonds').click(decider);
  $('.spades').click(decider);
  $('.clubs').click(decider);
  for(var i = 0; i <= 6; i++){
    $('.col'+i).click(decider);
    // adds img to column, may need to move function somewhere else
    // $('.col'+i).click(cardImgAdd);
    // console.log('img added');
  }
}


//present info in console
function present(){
  console.log(cards);
  console.log(board);
  console.log('Cards in board.deck: ', board.deck);
  console.log('Cards in board.drawn: ', board.drawn);
}

function init(){
  deckCreate();
  shuffle();
  deal();
  addColClick();
  topImg();
}

init();
present();