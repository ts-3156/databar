/**
 * jquery.databar - jQuery plugin for Excel-style data bar.
 * https://github.com/ts-3156/databar
 * Released under the MIT license
 */
(function ($) {
  $.fn.databar = function (options) {
    var options = options || {};

    var colorMaker = (function(){
      var n = 0;
      // solarized colors
      // http://ethanschoonover.com/solarized
      var colors = [
        'rgba(181, 137, 0, 0.4)',   // '#b58900',
        'rgba(203, 75, 22, 0.4)',   // '#cb4b16',
        'rgba(220, 50, 47, 0.4)',   // '#dc322f',
        'rgba(211, 54, 130, 0.4)',  // '#d33682',
        'rgba(108, 113, 196, 0.4)', // '#6c71c4',
        'rgba(38, 139, 210, 0.4)',  // '#268bd2',
        'rgba(42, 161, 152, 0.4)',  // '#2aa198',
        'rgba(133, 153, 0, 0.4)'    // '#859900'
      ];
      return function() {
        n++;
        if(n >= colors.length){
          n = 0;
        }
        return colors[n];
      };
    })();

    options.css = $.extend({
      textAlign: 'right'
    }, options.css);

    var $table = $(this);
    if($table.find('thead').length == 0){
      console.error('thead not found. please use thead, th, tbody, tr and td.');
      return;
    }
    if($table.find('tbody').length == 0){
      console.error('tbody not found. please use thead, th, tbody, tr and td.');
      return;
    }
    if($table.find('tbody tr').length == 0){
      console.error('tr not found. please use thead, th, tbody, tr and td.');
      return;
    }
    if($table.find('tbody tr td').length == 0){
      console.error('td not found. please use thead, th, tbody, tr and td.');
      return;
    }

    var column_size = $table.find('tbody tr').first().find('td').length;

    for(var i = 0; i < column_size; i++){
      var $vertical_tds = $table.find('tbody tr > :nth-child(' + (i + 1) + ')');
      var numbers = $vertical_tds.map(function (i) {
        var text = $(this).text();

        var stripped = text.replace(/[\s,%$\\]/g, '');
        if ($.isNumeric(stripped)) {
          return parseFloat(stripped);
        } else {
          return false;
        }
      });

      (function ($tds, options) {
        var metrics = {};
        metrics['100%'] = Math.max.apply(null, numbers);
        var color = colorMaker();

        $tds.each(function (i) {
          if (numbers[i] === false) {
            return true;
          }
          var $bar = $('<span />')
            .css($.extend({
              'position': 'absolute',
              'top': 0,
              'left': 0,
              'zIndex': 0,
              'display': 'block',
              'height': '100%',
              'width': (100 * numbers[i] / metrics['100%']) + '%',
              'backgroundColor': color
            }, options.css));
          $(this).prepend($bar);

          $(this).wrapInner($('<div />').css({
            'position': 'relative',
            'textAlign': options.css['textAlign']
          }));
        });
      })($vertical_tds, options);
    }

    return this;
  }
}(jQuery));

