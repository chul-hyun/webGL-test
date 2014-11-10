define(['lodash'],function(_){
	function barChart(wg, values, names, start_x, start_y, gap_x, gap_y, width){
		var draw_x, draw_y, pre_x, pre_y, i;
		var user_color = wg.ctx.fillStyle;

		draw_x = start_x;
		draw_y	= start_y;
		var bar_start_y = start_y + 20; //bar와 글자와의 간격을 주기위해 +20
		var half_width = width / 2;

		_.forIn(values, function(value){
			draw_y = bar_start_y + gap_y * value;
			
			for( i = 1 ; i < half_width ; i ++){
				wg.BHLine(draw_x - i, bar_start_y, draw_x - i, draw_y);
				wg.BHLine(draw_x + i, bar_start_y, draw_x + i, draw_y);
			}
			
			wg.BHLine(draw_x, bar_start_y, draw_x, draw_y);
			
			draw_x += gap_x;
		});

		draw_x = start_x;
		draw_y	= start_y;
		wg.ctx.fillStyle = '#000000'; //black color
		wg.ctx.textAlign="center"; 
		wg.ctx.font='bold 15px Arial';
		_.forIn(names, function(name){
			wg.ctx.fillText(name,draw_x, wg.height - draw_y );
			
			draw_x += gap_x;
		});

		wg.ctx.fillStyle = user_color; //restore color
	}

	return barChart;
})