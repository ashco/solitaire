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
function card(value, name, suit){
  this.value = value;
  this.name = name;
  this.suit = suit;
}

//generates 52 card deck list
function deck(){
  this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  this.suits = ['Hearts','Diamonds','Spades','Clubs'];
  this.color = ['Red', 'Black'];
  for( var s = 0; s < this.suits.length; s++ ) {
    for( var n = 0; n < this.names.length; n++ ) {
      cards.push( new card( n+1, this.names[n], this.suits[s] ));
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
function move(start, target) {
  //if red to black, black to red, execute
  // if(cards[].suit)
    target.push(start.pop());

}








//present info in console
function present(){
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