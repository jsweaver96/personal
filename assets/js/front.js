$(document).ready(function(){
    $("#sidebar").mouseover(function(){
	$(this).animate({width:'toggle'},200);
    });

    $("#sidebar").mouseleave(function(){
	$(this).animate({width:'toggle'},200);
    });
});
