'use strict';

window.helpers = (function () {
  return {
    getRandomValue: function (arr) {
      return arr[Math.floor(arr.length * Math.random())];
    },
    getMaxElement: function (arr) {
      var maxElement = arr[0];
      for (var i = 1; i < arr.length; i++) {
        if (maxElement < arr[i]) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },
    getRandomInt: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
