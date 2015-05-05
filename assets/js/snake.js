var running = false;

$(document).ready(function(){
    $("startSnake").click(function(){
	if (!running){
	    gameStart();
	}
    });

    $("startSnake").mouseover(function(){
	$(this).css("background-color","#4C4C4C");
    });
    
    $("startSnake").mouseleave(function(){
	if (!running){
	    $(this).css("background-color","#BCBCBC");
	}
    });
});

function gameStart(){
    running = true;
    $("startSnake").css("background-color","#4C4C4C");
}
