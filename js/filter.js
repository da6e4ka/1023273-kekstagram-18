'use strict';

(function () {
  var popularFilterElement = document.querySelector('#filter-popular');
  var discussedFilterElement = document.querySelector('#filter-discussed');
  var randomFilterElement = document.querySelector('#filter-random');

  var removePictures = function () {
    var photo = window.preview.picturesElement.querySelectorAll('.picture');
    photo.forEach(function (item) {
      window.preview.picturesElement.removeChild(item);
    });
  };

  var reset = function () {
    var filters = document.querySelector('.img-filters');
    var filterButtons = filters.querySelectorAll('.img-filters__button');
    filterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  var sortByPopularity = function (photos) {
    return photos.sort(function (photo1, photo2) {
      return photo1.likes < photo2.likes ? 1 : -1;
    });
  };

  window.filter = {
    sortByPopularity: sortByPopularity,
    removePictures: removePictures,
    reset: reset,
    popularElement: popularFilterElement,
    discussedElement: discussedFilterElement,
    randomElement: randomFilterElement
  };
})();
