$(document).ready(function(){

	$('.slides').slick({
  		dots:true,
  		infinite: true,
  		speed: 1000,
  		adaptiveHeight: true
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
	  	
	  	$("#item-info-"+currentSlide).fadeOut('slow', function(){
	  		$("#item-info-"+nextSlide).fadeIn('slow');
	  	});
	  	

	});

});

