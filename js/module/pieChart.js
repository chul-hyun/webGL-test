define([], function(){

	function pieChart(wg, center_x, center_y, radius, values){
		var data_sum = 0;
		values.forEach(function(value){
			data_sum += value;
		});

		wg.midPointCircle(center_x, center_y, radius);
		var previousSliceAngle = 0;
		var nSlices = values.length;
		var sliceAngle;
		var twoPI = Math.PI * 2;
		var draw_x, draw_y;
		for(var k = 0 ; k < nSlices ; k++){
			sliceAngle = twoPI * values[k] / data_sum + previousSliceAngle;
			draw_x = center_x + radius * Math.cos(sliceAngle);
			draw_y = center_y + radius * Math.sin(sliceAngle);

			wg.BHLine(center_x, center_y, draw_x, draw_y);
			previousSliceAngle = sliceAngle;
		}
	}

	return pieChart;
})