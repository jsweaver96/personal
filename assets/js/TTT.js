var gameArray = new Array(3);
var gameTurn = 0;

$(document).ready(function(){
    makeBoard();
    $(".gameCell").mouseover(function(){
	$(this).css("background-color","gray");
    });
    
    $(".gameCell").mouseleave(function(){
	$(this).css("background-color","white");
    });

    $(".gameCell").click(function(event){
	var pos = $(this).position();
	alert(pos.top);
	//makeMove(pos.left % 100, pos.top % 100);
    });
});

function makeBoard(){
    var gameBoard = $("<div></div>");
    gameBoard.addClass("TTT");
    gameBoard.css("background-color","red");
    //gameBoard.css("z-index","0");
    $("h1").after(gameBoard);
    for (var i = 0; i < 3; i++){
	gameArray[i] = new Array(3);
	for (var j = 0; j < 3; j++){
	    gameArray[i][j] = {html:$("<div></div>"),checked:false,owner:null};
	    gameBoard.append(gameArray[i][j].html);
	    gameArray[i][j].html.addClass("gameCell");
	    gameArray[i][j].html.css("background-color","blue");
	    gameArray[i][j].html.width(100);
	    gameArray[i][j].html.height(100);
	    gameArray[i][j].html.css({
		position: "absolute",
		left: i * 100 + "px",
		top: j * 100 + "px"
	    });
	}
    }
}

function makeMove(x,y){
    if (gameArray[x][y].owner === null){
	gameArray[x][y].owner = gameTurn % 2;
	gameTurn++;
    }
}
