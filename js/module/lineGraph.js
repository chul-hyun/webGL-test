define(['lodash'],function(_){
	function lineGraph(wg, values, names, start_x, start_y, gap_x, gap_y){
		var draw_x, draw_y, pre_x, pre_y;

		draw_x = start_x;
		draw_y	= start_y;
		pre_x;
		pre_y;
		_.forIn(values, function(value){
			draw_y = start_y + gap_y * value;
			
			drawStar(wg, draw_x, draw_y, 3);
			if( pre_x !== undefined && pre_y !== undefined ){
				wg.BHLine(pre_x, pre_y, draw_x, draw_y);
			}
			pre_x = draw_x;
			pre_y = draw_y;
			
			draw_x += gap_x;
		});

		draw_x = start_x;
		draw_y	= start_y;
		_.forIn(names, function(name){
			// -6은 텍스트를 중앙에 정렬하기 위한 하드코딩.
			wg.ctx.fillText(name,draw_x - 6, wg.height - draw_y );
			
			draw_x += gap_x;
		});
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