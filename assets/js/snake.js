var running = false;
var segSize = 10;
var bxSize = 50;
var bySize = 50;
var boardArray = new Array(50);

var openType = 1;
var foodType = 2;
var headType = 3;
var bodyType = 4;

var openClr = "#FFFFFF";
var foodClr = "#663300";
var headClr = "#990000";
var bodyClr = "#FF0000";

var kLeft = 37;
var kUp = 38;
var kRight = 39;
var kDown = 40;

var mLeft = 1;
var mUp = 2;
var mRight = 3;
var mDown = 4;

var snakeHead = new Object();
var snakeBody = [];
var bodySize = 2;
var bodyToAdd = 0;
var foodBit = new Object();

var dir;

$(document).ready(function(){
    $("#startSnake").click(function(){
	if (!running){
	    gameStart();
	}
    });

    $("#startSnake").mouseover(function(){
	$(this).css("background-color","#4C4C4C");
    });
    
    $("#startSnake").mouseleave(function(){
	if (!running){
	    $(this).css("background-color","#BCBCBC");
	}
    });

    $(document).keydown(function(event){
	if (running){
	    changeDir(event.which);
	}
    });
});

function gameStart(){
    gameInit();
    setInterval(function(){moveSnake();}, 50);
}

function setRect(seg, type){
    seg.type = type;
    if (seg.type == openType){
	seg.html.css("background-color",openClr);
    }
    else if (seg.type == foodType){
	seg.html.css("background-color",foodClr);
    }
    else if (seg.type == headType){
	seg.html.css("background-color",headClr);
    }
    else if (seg.type == bodyType){
	seg.html.css("background-color",bodyClr);
    }
    return seg;
}

function gameInit(){
    running = true;
    $("#startSnake").css("background-color","#4C4C4C");
    for (var i = 0; i < bxSize; i++){
	boardArray[i] = new Array(bySize);
	for (var j = 0; j < bySize; j++){
	    boardArray[i][j] = {html:$("<div></div>"),type:openType};
	    boardArray[i][j].html.addClass("segment");
	    boardArray[i][j].html.width(segSize);
	    boardArray[i][j].html.height(segSize);
	    boardArray[i][j].html.css({
		left: i * segSize + "px",
		top: j * segSize + "px"
	    });
	    $("#snakeArea").append(boardArray[i][j].html);
	}
    }
    snakeHead.x = bxSize / 2;
    snakeHead.y = bySize / 2;
    snakeBody.push({x:snakeHead.x,y:snakeHead.y - 1});
    snakeBody.push({x:snakeHead.x,y:snakeHead.y - 2});
    boardArray[snakeHead.x][snakeHead.y] = setRect(boardArray[snakeHead.x][snakeHead.y],headType);
    boardArray[snakeBody[0].x][snakeBody[0].y] = setRect(boardArray[snakeBody[0].x][snakeBody[0].y],bodyType);
    boardArray[snakeBody[1].x][snakeBody[1].y] = setRect(boardArray[snakeBody[1].x][snakeBody[1].y],bodyType);
    dir = mDown;
    setFood();
}

function changeDir(key){
    if (key == kLeft && snakeBody[0].x != snakeHead.x - 1){
	dir = mLeft;
    }
    else if (key == kRight && snakeBody[0].x != snakeHead.x + 1){
	dir = mRight;
    }
    else if (key == kUp && snakeBody[0].y != snakeHead.y - 1){
	dir = mUp;
    }
    else if (key == kDown && snakeBody[0].y != snakeHead.y + 1){
	dir = mDown;
    }
}

function moveSnake(){
    if (dir == mLeft){
	shiftSnake(-1,0);
    }
    else if (dir == mRight){
	shiftSnake(1,0);
    }
    else if (dir == mUp){
	shiftSnake(0,-1);
    }
    else if (dir == mDown){
	shiftSnake(0,1);
    }
}

function shiftSnake(x,y){
    if (snakeHead.x + x < 0 || snakeHead.x + x >= bxSize){
	endGame();
    }
    else if (snakeHead.y + y < 0 || snakeHead.y + y >= bySize){
	endGame();
    }
    else {
	var lastSegX = snakeHead.x;
	var lastSegY = snakeHead.y;
	boardArray[snakeHead.x][snakeHead.y] = setRect(boardArray[snakeHead.x][snakeHead.y],bodyType);
	snakeHead.x += x;
	snakeHead.y += y;
	checkEat();
	boardArray[snakeHead.x][snakeHead.y] = setRect(boardArray[snakeHead.x][snakeHead.y],headType);
	var snakeEnd = snakeBody.pop();
	snakeBody.unshift({x:snakeEnd.x,y:snakeEnd.y});
	snakeBody[0].x = lastSegX;
	snakeBody[0].y = lastSegY;
	if (bodyToAdd){
	    snakeBody.push({x:snakeEnd.x,y:snakeEnd.y});
	    bodySize += 1;
	    bodyToAdd = 0;
	}
	else {
	    boardArray[snakeEnd.x][snakeEnd.y] = setRect(boardArray[snakeEnd.x][snakeEnd.y],openType);
	}
    }
}

function checkEat(){
    if (snakeHead.x == foodBit.x && snakeHead.y == foodBit.y){
	bodyToAdd = 1;
	setFood();
    }
    else {
	for (var i = 0; i < bodySize; i++){
	    if (snakeHead.x == snakeBody[i].x && snakeHead.y == snakeBody[i].y){
		endGame();
	    }
	}
    }
}

function endGame(){
    running = 0;
    alert("You lose.");
    location.reload();
}

function setFood(){
    var checked = false;
    while(!checked){
	checked = true;
	foodBit = {x:Math.floor(Math.random() * (bxSize - 2) + 1),y:Math.floor(Math.random() * (bxSize - 2) + 1)};
	if (foodBit.x == snakeHead.x && foodBit.y == snakeHead.y){
	    checked = false;
	    continue;
	}
	for (var i = 0; i < bodySize; i++){
	    if (foodBit.x == snakeBody[i].x && foodBit.y == snakeBody[i].y){
		checked = false;
		break;
	    }
	}
    }
    boardArray[foodBit.x][foodBit.y] = setRect(boardArray[foodBit.x][foodBit.y],foodType);
}
