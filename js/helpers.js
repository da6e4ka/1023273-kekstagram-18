'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var showElement = function (item) {
    item.classList.remove('hidden');
  };

  var hideElement = function (item) {
    item.classList.add('hidden');
  };

  var sortByComments = function (arr) {
    return arr.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var sortRandom = function () {
    return Math.random() - 0.9;
  };

  var sortRandomPhotos = function (arr) {
    return arr.slice(0, 10).sort(sortRandom);
  };

  window.helpers = {
    showElement: showElement,
    hideElement: hideElement,
    getRandomNumber: getRandomNumber,
    sortByComments: sortByComments,
    sortRandom: sortRandom,
    sortRandomPhotos: sortRandomPhotos
  };
})();
