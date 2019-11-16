'use strict';

(function () {
  var onPopupClose = function (event) {
    if (event.keyCode === window.constants.ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var closeBigPhoto = function () {
    window.helpers.hideElement(window.preview.bigPictureElement);
    document.removeEventListener('keydown', onPopupClose);
  };

  var showBigPhoto = function (data) {
    window.helpers.showElement(window.preview.bigPictureElement);
    window.preview.bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = data.url;

    document.addEventListener('keydown', function (event) {
      if (event.keyCode === window.constants.ESC_KEYCODE) {
        closeBigPhoto();
      }
    });
  };

  window.bigSizePhoto = {
    closeBigPhoto: closeBigPhoto,
    onPopupClose: onPopupClose,
    showBigPhoto: showBigPhoto
  };
})();
