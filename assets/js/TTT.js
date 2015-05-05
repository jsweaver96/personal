var gameArray = new Array(3);
var gameTurn = 0;

$(document).ready(function(){
    makeBoard();
    $(".gameCell").mouseover(function(){
	var pos = $(this).position();
	if (getTile(pos.left / 100, pos.top / 100) == 0){
	    $(this).css("background-color","gray");
	}
    });
    
    $(".gameCell").mouseleave(function(){
	$(this).css("background-color","white");
    });

    $(".gameCell").click(function(event){
	var pos = $(this).position();
	makeMove(pos.left / 100, pos.top / 100);
    });
});

function makeBoard(){
    var gameBoard = $("<div></div>");
    gameBoard.addClass("TTT");
    gameBoard.css("background-color","white");
    //gameBoard.css("z-index","0");
    $("h1").after(gameBoard);
    for (var i = 0; i < 3; i++){
	gameArray[i] = new Array(3);
	for (var j = 0; j < 3; j++){
	    gameArray[i][j] = {html:$("<div></div>"),checked:false,owner:0};
	    gameBoard.append(gameArray[i][j].html);
	    gameArray[i][j].html.addClass("gameCell");
	    gameArray[i][j].html.css("background-color","white");
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
    if (gameArray[x][y].owner == 0){
	gameArray[x][y].owner = gameTurn % 2 + 1;
	if (gameTurn % 2 + 1 == 1){
	    gameArray[x][y].html.text("X");
	    //gameArray[x][y].html.css("font-size","50");
	)
	else {
	    gameArray[x][y].html.text("O");
	    //gameArray[x][y].html.css("font-size","50"); 
	}
	if (checkWin()){
	    alert("Player " + (gameTurn % 2 + 1) + " Wins!");
	}
	gameTurn++;
    }
}

function checkWin(){
    if (getTile(0,0) != 0 && getTile(0,0) == getTile(1,0) && getTile(1,0) == getTile(2,0)){
	return true;
    }
    if (getTile(0,0) != 0 && getTile(0,0) == getTile(0,1) && getTile(0,1) == getTile(0,2)){
	return true;
    }
    if (getTile(1,0) != 0 && getTile(1,0) == getTile(1,1) && getTile(1,1) == getTile(1,2)){
	return true;
    }
    if (getTile(2,0) != 0 && getTile(2,0) == getTile(2,1) && getTile(2,1) == getTile(2,2)){
	return true;
    }
    if (getTile(0,1) != 0 && getTile(0,1) == getTile(1,1) && getTile(1,1) == getTile(1,2)){
	return true;
    }
    if (getTile(0,2) != 0 && getTile(0,2) == getTile(1,2) && getTile(1,2) == getTile(2,2)){
	return true;
    }
    if (getTile(0,0) != 0 && getTile(0,0) == getTile(1,1) && getTile(1,1) == getTile(2,2)){
	return true;
    }
    if (getTile(0,2) != 0 && getTile(0,2) == getTile(1,1) && getTile(1,1) == getTile(2,0)){
	return true;
    }
    return false;
}
    
function getTile(x,y){
    return gameArray[x][y].owner;
}
