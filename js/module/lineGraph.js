define(['lodash'],function(_){
	function lineGraph(wg, values, names, start_x, start_y, gap_x, gap_y){
		var draw_x, draw_y, pre_x, pre_y;
		var user_color = wg.ctx.fillStyle;

		draw_x = start_x;
		draw_y	= start_y;
		pre_x;
		pre_y;

		_.forIn(values, function(value){
			draw_y = start_y + gap_y * value;
			
			wg.ctx.fillStyle = '#ff0000'; //red color
			drawStar(wg, draw_x, draw_y, 3);
			if( pre_x !== undefined && pre_y !== undefined ){
				wg.ctx.fillStyle = user_color;
				wg.BHLine(pre_x, pre_y, draw_x, draw_y);
			}
			pre_x = draw_x;
			pre_y = draw_y;
			
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

	function drawStar(wg, x, y, length){
		wg.setPixel(x, y);

		wg.BHLine(x+ 1,	y,		x + length,	y);
		wg.BHLine(x - 1,	y,		x - length, y);
		wg.BHLine(x,		y + 1,	x,			y + length);
		wg.BHLine(x,		y - 1,	x,			y - length);
		wg.BHLine(x+ 1,	y + 1,	x + length,	y + length);
		wg.BHLine(x - 1,	y - 1,	x - length, y - length);
		wg.BHLine(x - 1,	y + 1,	x - length,	y + length);
		wg.BHLine(x + 1,	y - 1,	x + length,	y - length);
	}

	return lineGraph;
})