var gameArray = new Array(3);
var gameTurn = 0;
var gameOver = false;

/* On start */
$(document).ready(function(){
    makeBoard(); // Setup the board
    /* Set background of game tile to gray when the mouse is hovering*/
    $(".gameCell").mouseover(function(){
	var pos = $(this).position();
	if (getTile(pos.left / 100, pos.top / 100) == 0){
	    $(this).css("background-color","gray");
	}
    });

    $("#restart").mouseover(function(){
	$(this).css("background-color","#333333");
    });

    $("#restart").mouseleave(function(){
	$(this).css("background-color","#E6E6E6");
    });
    
    /* Return the tile color to white when the mouse leaves the tile area */
    $(".gameCell").mouseleave(function(){
	$(this).css("background-color","white");
    });
    /* Make move if game is running */
    $(".gameCell").click(function(event){
	var pos = $(this).position();
	if (!gameOver){
	    makeMove(pos.left / 100, pos.top / 100);
	}
    });

    $("#restart").click(function(){
	onRestart();
    });
});

function makeBoard(){
    setStatus("Player 1's move");
    gameOver = false;
    var gameBoard = $("<div></div>");
    gameBoard.addClass("TTT");
    gameBoard.css("background-color","white");
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
	}
	else {
	    gameArray[x][y].html.text("O");
	}
	if (checkWin()){
	    if (gameTurn % 2 == 0){
		setStatus("Player 1 wins!");
	    }
	    else {
		setStatus("Player 2 wins!");
	    }
	    gameOver = true;
	    return;
	}
	
	gameTurn++;
	
	if (gameTurn % 2 == 0){
	    setStatus("Player 1's move");
	}
	else{
	    setStatus("Player 2's move");
	}
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
    if (getTile(0,1) != 0 && getTile(0,1) == getTile(1,1) && getTile(1,1) == getTile(2,1)){
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

function setStatus(str){
    $("#status").text("Current Status: " + str);
}

function onRestart(){
    location.reload();
}
