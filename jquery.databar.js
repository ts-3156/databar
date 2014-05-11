/**
 * jquery.databar - jQuery plugin for Excel-style data bar.
 * https://github.com/ts-3156/databar
 * Released under the MIT license
 */
(function ($) {
  $.fn.databar = function (options) {
    var options = options || {};

    options.css = $.extend({
      backgroundColor: 'rgba(64,153,255,0.25)',
      textAlign: 'right'
    }, options.css);

    var $tds = $(this),
      numbers = [];

    $tds.each(function (i) {
      var text = $(this).text();
      var stripped = text.replace(/[\s,%$\\]/g, '');
      if ($.isNumeric(stripped)) {
        numbers[i] = parseFloat(stripped);
      } else {
        numbers[i] = false;
      }
    });

    (function ($tds, options) {
      var metrics = {};
      metrics['100%'] = Math.max.apply(null, numbers);

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
            'width': (100 * numbers[i] / metrics['100%']) + '%'
          }, options.css));
        $(this).prepend($bar);

        $(this).wrapInner($('<div />').css({
          'position': 'relative',
          'textAlign': options.css['textAlign']
        }));
      });
    })($tds, options);

    return this;
  }
}(jQuery));

