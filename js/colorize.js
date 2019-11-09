'use strict';

(function () {
  window.colorize = function (element, input, colors) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      var color = window.helpers.getRandomValue(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      input.value = element.style.fill;
    });
  };
})();
