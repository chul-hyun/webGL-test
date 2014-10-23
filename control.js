$(function(){
	var mode = $('#mode').val();
	$('#mode').on('change', function(){
		mode = this.value;
	});

	$('#world').on('click', function(e){
		var x = (e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
	})
})