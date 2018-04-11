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
  this.names = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
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