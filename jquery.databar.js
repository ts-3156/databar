/**
 * jquery.databar - jQuery plugin for Excel-style data bar.
 * https://github.com/ts-3156/databar
 * Released under the MIT license
 */
(function ($) {
  var ColorMaker = function(options) {
    var options = options || {};
    this.options = $.extend({}, options);

    this.color = (function (self) {
      var n = 0;
      var backgroundOpacity = (self.options.backgroundOpacity || 0.4);
      // solarized colors
      // http://ethanschoonover.com/solarized
      var colors = [
          'rgba(181, 137, 0, ' + backgroundOpacity + ')',   // '#b58900',
          'rgba(203, 75, 22, ' + backgroundOpacity + ')',   // '#cb4b16',
          'rgba(220, 50, 47, ' + backgroundOpacity + ')',   // '#dc322f',
          'rgba(211, 54, 130, ' + backgroundOpacity + ')',  // '#d33682',
          'rgba(108, 113, 196, ' + backgroundOpacity + ')', // '#6c71c4',
          'rgba(38, 139, 210, ' + backgroundOpacity + ')',  // '#268bd2',
          'rgba(42, 161, 152, ' + backgroundOpacity + ')',  // '#2aa198',
          'rgba(133, 153, 0, ' + backgroundOpacity + ')'    // '#859900'
      ];
      return function () {
        n++;
        if (n >= colors.length) {
          n = 0;
        }
        return colors[n];
      };
    })(this);
  };

  var throw_if_invalid_html = function($table){
    if ($table.find('thead').length == 0) {
      throw 'thead not found. please use thead, th, tbody, tr and td.';
    }
    if ($table.find('tbody').length == 0) {
      throw 'tbody not found. please use thead, th, tbody, tr and td.';
    }
    if ($table.find('tbody tr').length == 0) {
      throw 'tr not found. please use thead, th, tbody, tr and td.';
    }
    if ($table.find('tbody tr td').length == 0) {
      throw 'td not found. please use thead, th, tbody, tr and td.';
    }
  };

  $.fn.databar = function (options) {
    var options = options || {};
    var colorMaker = new ColorMaker(options);

    options.css = $.extend({
      textAlign: 'right'
    }, options.css);


    var $table = $(this);
    throw_if_invalid_html($table);

    var column_size = $table.find('tbody tr').first().find('td').length;

    for (var i = 0; i < column_size; i++) {
      var $vertical_tds = $table.find('tbody tr > :nth-child(' + (i + 1) + ')');
      var numbers = $vertical_tds.map(function (i) {
        var text = $(this).text();

        var stripped = text.replace(/[\s,%$円€\\]/g, '');
        if ($.isNumeric(stripped)) {
          return parseFloat(stripped);
        } else {
          return false;
        }
      });

      (function ($tds, options) {
        var metrics = {};
        metrics['100%'] = Math.max.apply(null, numbers);
        var color = colorMaker.color();

        $tds.each(function (i) {
          var $td = $(this);

          if (numbers[i] === false) {
            return true;
          }
          if ($td.hasClass('databar-ignore')) {
            return true;
          }

          var $bar = $('<span />')
            .css($.extend({
              'position': 'absolute',
              'top': 0,
              'left': 0,
              'right': 0,
              'zIndex': 0,
              'display': 'block',
              'height': '100%',
              'width': (100 * numbers[i] / metrics['100%']) + '%',
              'backgroundColor': color
            }, options.css));
          $td.prepend($bar);

          $td.wrapInner($('<div />')
            .css({
              'position': 'relative',
              'min-height': '1.5em' // float bug fix
          }));
        });
      })($vertical_tds, options);
    }

    return this;
  }
}(jQuery));
