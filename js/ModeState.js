/* jshint unused: false */

define(['jquery', 'binder', 'WebGL', 'lodash', 'distance'], function($, binder, WebGL, _, distance){
	return binder(function(canvas, mode, reset){
		var wg = new WebGL(canvas);
		var that = this;

		this.$regist({
			type: mode.value,
			fn: function(type){
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
					default :
						throw new Error(type+' is not a method.');
				}

				return fn;
			},
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
		});

		$(canvas).on('mousedown', function(event) {
			$(canvas).on('mousemove', preview);
			var x = ( _.isUndefined(event.offsetX) ) ? event.layerX:event.offsetX;
			var y = ( _.isUndefined(event.offsetY) ) ? event.layerY:event.offsetY;
			that.saved_pos = [x, y];
		});
		
		$(canvas).on('mouseup', function(event) {
			$(canvas).off('mousemove', preview);
			if( that.saved ){
				that.saved = false;
				var x = ( _.isUndefined(event.offsetX) ) ? event.layerX:event.offsetX;
				var y = ( _.isUndefined(event.offsetY) ) ? event.layerY:event.offsetY;

				wg.restore();
				that.fn(that.saved_pos[0], that.saved_pos[1], x, y);
				wg.save();
			}
		});

		

		function preview(event) {
			var x = ( _.isUndefined(event.offsetX) ) ? event.layerX:event.offsetX;
			var y = ( _.isUndefined(event.offsetY) ) ? event.layerY:event.offsetY;

			wg.restore();
			that.fn(that.saved_pos[0], that.saved_pos[1], x, y);
		}

		$(reset).on('click', function(){
			wg.clear().save();
		}).click();


		$('#canvas_color').on('change', function(){
			wg.ctx.fillStyle = this.value;
		}).change();
	});
});