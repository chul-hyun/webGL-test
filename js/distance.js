define(function(){
	function distance(start_x, start_y, end_x, end_y){
		var dx = end_x - start_x;
		var dy = end_y - start_y;
		return parseInt(Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) ));
	}

	return distance;
});