/* jshint unused: false */

define(['jquery', 'binder', 'WebGL', 'lodash', 'module/distance', 'module/lineGraph', 'module/pieChart', 'module/drawCurve', 'model/sample_data1', 'model/sample_data2'], 
	function($, binder, WebGL, _, distance, lineGraph, pieChart, drawCurve, sample_data1, sample_data2){
	
	return binder(function(canvas, mode, reset){
		var world_wg = new WebGL(canvas);
		
		var preview_wg = world_wg.getLayer();
		var local_wg = world_wg.getLayer();

		//$('body').append(preview_wg.canvas);
		//$('body').append(local_wg.canvas);

		var that = this;

		this.$regist({
			type: mode.value,
			saved_pos: function(type){
				this.saved = false;
				return [-1, -1];
			},
			saved: function(saved_pos){
				if( _.isArray(saved_pos) && saved_pos[0] !== -1 ){
					return true;
				}
				else{
					return false;
				}
			}
		});

		$(mode).on('change', function(){
			that.type = this.value;
			if( this.value === 'lineGraph' ){
				local_wg.clear();
				lineGraph(local_wg, sample_data1.values, sample_data1.names, 100, 200, 50, 1)
				world_wg.update();
			}
			else if( this.value === 'pieChart' ){
				local_wg.clear();
				pieChart(local_wg, 400, 400, 200, sample_data2.values)
				world_wg.update();
			}
			else if( 
			        this.value === 'limacon'  ||
			        this.value === 'cardioid'  ||
			        this.value === 'threeLeaf'  ||
			        this.value === 'fourLeaf'  ||
			        this.value === 'spiral'
			        ){
				local_wg.clear();
				drawCurve(local_wg, this.value )
				world_wg.update();
			}
		});

		var preview = function(event){
			preview_wg.clear();
			drawEvent(event, preview_wg, that, world_wg);
		}
		
		$(canvas).on('mousedown', function(event) {
			$(canvas).on('mousemove', preview);
			
			var x = ( _.isUndefined(event.offsetX) ) ? event.layerX:event.offsetX;
			var y = ( _.isUndefined(event.offsetY) ) ? event.layerY:event.offsetY;
			that.saved_pos = [x, y];
		});
		
		$(canvas).on('mouseup', function(event) {
			$(canvas).off('mousemove', preview);
			preview_wg.clear();

			if( that.saved ){
				that.saved = false;
				drawEvent(event, local_wg, that, world_wg);
			}
		});

		$(reset).on('click', function(){
			world_wg.clear();
		}).click();

		$('#canvas_color').on('change', function(){
			preview_wg.ctx.fillStyle = this.value;
			local_wg.ctx.fillStyle = this.value;
		}).change();

		//var prame = 70;
		//setInterval(function(){
		//	world_wg.update();
		//}, 1000/prame);

	});
	
	function drawEvent(event, wg, that, world_wg) {
		var x = ( _.isUndefined(event.offsetX) ) ? event.layerX:event.offsetX;
		var y = ( _.isUndefined(event.offsetY) ) ? event.layerY:event.offsetY;
		
		getDrawFn(wg, that.type)(that.saved_pos[0], wg.height - that.saved_pos[1], x, wg.height - y)
		world_wg.update();
	}

	function getDrawFn(wg, type){
		var fn = function(){};

		switch(type){
			case 'DDALine' : 
				fn = function(){
					wg.DDALine.apply(wg, arguments);
				};
				break;
			case 'BHLine'  :  
				fn = function(){
					wg.BHLine.apply(wg, arguments);
				};
				break;
			case 'midPointLine'  :  
				fn = function(){
					wg.midPointLine.apply(wg, arguments);
				};
				break;
			case 'midPointCircle'  :  
				fn = function(xc, yc, x, y){
					wg.midPointCircle(xc, yc, distance(xc, yc, x, y));
				};
				break;
			case 'midPointCircleSolid'  :  
				fn = function(xc, yc, x, y){
					wg.midPointCircleSolid(xc, yc, distance(xc, yc, x, y));
				};
				break;
			case 'midPointEllipse'  :  
				fn = function(xc, yc, x, y){
					wg.midPointEllipse(xc, yc, Math.abs(parseInt(xc - x)), Math.abs(parseInt(yc - y)));
				};
				break;
			case 'midPointEllipseSolid'  :  
				fn = function(xc, yc, x, y){
					wg.midPointEllipseSolid(xc, yc, Math.abs(parseInt(xc - x)), Math.abs(parseInt(yc - y)));
				};
				break;
		}

		return fn;
	}
});