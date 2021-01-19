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
  clubs: [],
};
var startNum = false;
var startArr = false;
var targetNum = false;
var targetArr = false;
var moveSize;
var moveCount = 0;

//EVENT LISTENERS
$(".deck").click(cycle);
$("#reset").click(reset);

function init() {
  deckCreate();
  shuffle();
  deal();
  addClick();
  $("img").attr("src", "./img/decks/large/deck_3.png");
  flippedImg();
}

init();
