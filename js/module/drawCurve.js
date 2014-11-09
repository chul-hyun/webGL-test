define([], function(){
	function drawCurve(wg, curveNum){
		var twoPI = Math.PI * 2;
		var a =175, b =60;

		var r, theta, dtheta = 1/a;
		var x0 = wg.width/2, y0 = wg.height/2;

		var start_x, start_y, end_x, end_y;

		start_x = x0;
		start_y = y0;

		switch(curveNum){
			case 'limacon' 		: start_x += a + b; 	break;
			case 'cardioid' 		: start_x += a + a; 	break;
			case 'threeLeaf' 	: start_x += a; 		break;
			case 'fourLeaf' 		: start_x += a; 		break;
			case 'spiral' 		:  					break;
			default 			:  					break;
		}

		theta = dtheta;
		while (theta < twoPI) {
			switch(curveNum){
				case 'limacon' 		: r = a * Math.cos(theta) + b; 		break;
				case 'cardioid' 		: r = a * ( 1 + Math.cos(theta) ); 	break;
				case 'threeLeaf' 	: r = a * Math.cos(3 * theta) ; 		break;
				case 'fourLeaf' 		: r = a * Math.cos(2 * theta) ; 		break;
				case 'spiral' 		: r = (a  / 4) * theta; 				break;
				default 			: 									break;
			}

			end_x = x0 + r * Math.cos(theta);
			end_y = x0 + r * Math.sin(theta);
			wg.BHLine(start_x, start_y, end_x, end_y);

			start_x = end_x;
			start_y = end_y;
			theta += dtheta;
		}
	}

	return drawCurve;
})