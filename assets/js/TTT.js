$(document).ready(function(){
    $(".gameCell").mouseover(function(){
	$(this).css("background-color","gray");
    });
    
    $(".gameCell").mouseleave(function(){
	$(this).css("background-color","white");
    });
});
