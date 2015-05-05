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
    //gameBoard.css("z-index","0");
    $("h1").after(gameBoard);
    var gameArray = new Array(3);
    for (var i = 0; i < 3; i++){
	gameArray[i] = new Array(3);
	for (var j = 0; j < 3; j++){
	    gameArray[i][j] = {html:$("<div></div>"),x:i,y:j};
	    gameBoard.append(gameArray[i][j].html);
	    gameArray[i][j].html.addClass("gameCell");
	    //gameArray[i][j].html.css("z-index","1");
	    gameArray[i][j].html.css("background-color","blue");
	    //gameArray[i][j].html.width(100);
	    //gameArray[i][j].html.height(100);
	    gameArray[i][j].html.text("(" + i + "," + j + ")");
	    var tempOff = gameArray[i][j].html.offsetParent();
	    var tempX = tempOff.left + i * 100;
	    var tempY = tempOff.top - j * 100;
	    //gameArray[i][j].html.offset({left:tempX,top:tempY});
	}
    }
}
