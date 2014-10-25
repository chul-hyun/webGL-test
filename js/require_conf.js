require.config({
    baseUrl: './js',
    paths:{
        'lib': '../node_modules/',
        'jquery' : '../node_modules/jquery/dist/jquery',
        'lodash' : '../node_modules/lodash/dist/lodash.min',
        'binder' : '../node_modules/binderjs/dist/binder.min',
        'Nested' : '../node_modules/nested-observe/dist/nested-observe.min',
        'WebGL'  : '../node_modules/WebGL/dist/WebGL'
    },
    map: {
      '*': {
        'css'    : 'lib/require-css/css'
      }
    }
});

require(['css!../main.css']);

require(['jquery', 'ModeState'], function($, ModeState){
    var canvas = $('#world')[0];
    var mode   = $('#mode')[0];
    var reset  = $('#reset')[0];

    var mode_state = new ModeState(canvas, mode, reset);
    test = function test(){
        console.log(mode_state.type);
    }
    
});