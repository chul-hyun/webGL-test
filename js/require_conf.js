require.config({
    baseUrl: './js',
    paths:{
        'lib': '../node_modules/',
        'jquery' : '../node_modules/jquery/dist/jquery',
        'lodash' : '../node_modules/lodash/dist/lodash.min',
        'binder' : '../node_modules/binderjs/dist/binder.min',
        'webGL'  : '../node_modules/webGL/dist/webGL'
    },
    map: {
      '*': {
        'css'    : 'lib/require-css/css'
      }
    }
});

require(['css!../main.css']);

require(['jquery', 'webGL'], function($, webGL){
    console.log($);
    var wg = new webGL($('#world')[0]);
    wg.MidPointLine(10, 10, 100, 100);
});