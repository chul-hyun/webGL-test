require.config({
	baseUrl: './test',
	paths:{
		'jquery' : '../node_modules/jquery/dist/jquery',
		'WebGL'  : '../node_modules/WebGL/dist/WebGL'
	},
	map: {
		'*': {
			'css': 'lib/require-css/css'
		}
	}
});

require(['WebGL', 'jquery'], function(WebGL, $){
	$(function(){
		wg = new WebGL( document.getElementById("world"));
		lay = wg.getLayer(100, 100);
		$('body').append(lay.canvas);
	});
});