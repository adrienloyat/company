// Menu
$(".nav li").click(function(e){
	$item = $(this);
	$(".nav li").removeClass("active");
	$item.addClass('active');
})