'use strict';

(function () {
  window.debounce = function (cb) {
    var timeout = null;

    return function () {
      var params = arguments;

      if (timeout) {
        window.clearTimeout(timeout);
      }

      timeout = window.setTimeout(function () {
        cb.apply(null, params);
      }, window.constants.DEBAUNCE_TIME);
    };
  };
})();
