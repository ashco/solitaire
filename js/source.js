//array of 52 cards
var cards = [];
//array of 52 ran gen card values 
var deckOrder = [];
//array of 28 ran gen card value numbers indicating board position 
// var boardOrder = [];
//Column arrays
var col0 = []
var col1 = []
var col2 = []
var col3 = []
var col4 = []
var col5 = []
var col6 = []

//generates card object attributes
function card(value, name, suit, color){
  this.value = value;
  this.name = name;
  this.suit = suit;
  this.color = color;
}

//generates 52 card deck list
function deck(){
  this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
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
function shuffle() {
  for(var i = 0; i < 52; i++){
    var cardSelect = (Math.floor(Math.random() * 52));
    if(deckOrder.includes(cardSelect)){
      i-=1;
    }else{
      deckOrder.push(cardSelect);
    }
  }
}

//distributes first 28 cards into board array
function deal(){
  col0 = deckOrder.splice(0, 1); 
  col1 = deckOrder.splice(0, 2);
  col2 = deckOrder.splice(0, 3);
  col3 = deckOrder.splice(0, 4);
  col4 = deckOrder.splice(0, 5);
  col5 = deckOrder.splice(0, 6);
  col6 = deckOrder.splice(0, 7);
}

//function to move card from 1 col to another
function boardMove(start, target){
  //if red to black, black to red
  //and if target is 1 value above start
  console.log((cards[start[start.length-1]]).value);
  console.log((cards[target[target.length-1]]).value)
  if(cards[start[start.length-1]].color !== cards[target[target.length-1]].color &&
  (cards[start[start.length-1]]).value + 1 === (cards[target[target.length-1]]).value){
      //execute
      target.push(start.pop());
      console.log('card moved!');
    }else{
    console.log('card cannot move');
  }
} 

//move card if array is 0 and card is king (value === 13)
function kingMove(start, target){
  if(cards[start[start.length-1]].value === 13 &&
  target.length === 0){
      target.push(start.pop());
      console.log('king card added to new array!');
    }else{
    console.log('card cannot move');
  }
} 


//add in check for empty array
//add in check for sequential order


//logic that determines if card can be moved to sideline storage area
function sideMove(start, target){

}

//logic that cycles through shuffled deck
function cycle(){

}



//present info in console
function present(){
  console.log(cards);
  console.log(col0);
  console.log(col1);
  console.log(col2);
  console.log(col3);
  console.log(col4);
  console.log(col5);
  console.log(col6);
  console.log('Cards in deck: ', deckOrder);
}


function init(){
  deck();
  shuffle();
  deal();
}


init();
present();