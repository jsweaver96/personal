$(document).ready(function(){
    var gameTurn = 0;
    makeBoard();
    $(".gameCell").mouseover(function(){
	$(this).css("background-color","gray");
    });
    
    $(".gameCell").mouseleave(function(){
	$(this).css("background-color","white");
    });
});

function makeBoard(){
    var gameBoard = $("<div></div>");
    gameBoard.addClass("TTT");
    gameBoard.css("background-color","red");
    $("h1").after(gameBoard);
}
