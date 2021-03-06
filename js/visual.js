//BOARD STATE IMAGES
// handles updating top of deck image
function deckImg() {
  if (board.deck.length === 0) {
    $(".deck").find("img").attr("src", "./img/extra/card_empty_black.png");
  } else {
    $(".deck").find("img").attr("src", "./img/decks/large/deck_3.png");
  }
}

// handles updating drawn card image
function drawnImg() {
  if (board.drawn.length === 0) {
    $(".drawn").find("img").attr("src", "./img/extra/card_empty_black.png");
  } else {
    $(".drawn").find("img").removeAttr();
    $(".drawn")
      .find("img")
      .addClass("flipped")
      .attr(
        "src",
        "./img/cards/large/card_" +
          cards[board.drawn[board.drawn.length - 1]].suit +
          "_" +
          cards[board.drawn[board.drawn.length - 1]].name +
          ".png"
      )
      .attr("data-cardnum", board.drawn[board.drawn.length - 1]);
  }
}

// handles adding select element
function selectImg(focus) {
  var selectImg = $("<div />");
  var selectRow = board[startArr].indexOf(startNum);

  if (
    startArr === "drawn" ||
    startArr === "hearts" ||
    startArr === "diamonds" ||
    startArr === "spades" ||
    startArr === "clubs"
  ) {
    selectRow = 0;
  }
  selectImg.addClass("row" + selectRow + " selected").click(deselect);
  $(focus).parent().append(selectImg);
}

function addImg() {
  //Calculates row ID num
  var rowNum = board[targetArr].indexOf(
    board[targetArr][board[targetArr].length - 1]
  );
  //suits logic
  if (
    targetArr === "hearts" ||
    targetArr === "diamonds" ||
    targetArr === "spades" ||
    targetArr === "clubs"
  ) {
    $(".flipped").removeAttr("src").removeAttr("data-cardnum");
  }
  //columns logic
  //add moveSize number of imgs for flippedImg to transform
  for (var i = 0; i < moveSize; i++) {
    $("." + targetArr).append(
      '<img class="row' + (rowNum - moveSize + i + 1) + ' flipped">'
    );
  }
  //
  if (board[targetArr].length === moveSize) {
    $("." + targetArr)
      .find("img")
      .first()
      .remove();
  }
}

function rmvImg() {
  //drawn pile
  if (startArr === "drawn") {
    return;
    //suits start
  } else if (
    startArr === "hearts" ||
    startArr === "diamonds" ||
    startArr === "spades" ||
    startArr === "clubs"
  ) {
    $(".flipped").removeAttr("src").removeAttr("data-cardnum");
    //columns logic - empty array
  } else if (board[startArr].length === 0) {
    $("." + startArr)
      .find(".flipped")
      .remove();
    $("." + startArr).append('<img class="row0 flipped">');
    //columns logic
  } else {
    for (var i = 0; i < moveSize; i++) {
      $("." + startArr)
        .find("img:nth-last-child(2)")
        .remove();
    }
    $("." + startArr)
      .find("img:nth-last-child(2)")
      .addClass("flipped");
  }
}

function flippedImg() {
  for (var stack in board) {
    //deck img
    if (stack === "deck") {
      //empty arrays
    } else if (board[stack].length === 0) {
      if (stack === "hearts") {
        $("." + stack)
          .find(".flipped")
          .attr("src", "./img/extra/card_empty_black_hearts.png");
      } else if (stack === "diamonds") {
        $("." + stack)
          .find(".flipped")
          .attr("src", "./img/extra/card_empty_black_diamonds.png");
      } else if (stack === "spades") {
        $("." + stack)
          .find(".flipped")
          .attr("src", "./img/extra/card_empty_black_spades.png");
      } else if (stack === "clubs") {
        $("." + stack)
          .find(".flipped")
          .attr("src", "./img/extra/card_empty_black_clubs.png");
      } else {
        $("." + stack)
          .find(".flipped")
          .attr("src", "./img/extra/card_empty_black.png");
      }
    } else {
      var flipList = $("." + stack).find(".flipped");
      var numToFlip = flipList.length;
      var flipArr = board[stack].slice(-numToFlip);
      for (var i = 0; i < numToFlip; i++) {
        $(flipList[i])
          .attr(
            "src",
            "./img/cards/large/card_" +
              cards[flipArr[i]].suit +
              "_" +
              cards[flipArr[i]].name +
              ".png"
          )
          .attr("data-cardnum", flipArr[i]);
      }
    }
  }
}
