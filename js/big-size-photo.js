'use strict';

(function () {
  var commentElement = document.querySelector('.social__footer-text');

  var preventHandler = function (evt) {
    evt.stopPropagation();
  };

  var escCloseHandler = function(evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var closePopupHandler = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var closeBigPhoto = function () {
    window.helpers.hideElement(window.preview.bigPictureElement);
    document.removeEventListener('keydown', closePopupHandler);
    commentElement.removeEventListener('keydown', preventHandler);
    document.removeEventListener('keydown', escCloseHandler);
  };

  var showBigPhoto = function (data) {
    commentElement.addEventListener('keydown', preventHandler);
    window.helpers.showElement(window.preview.bigPictureElement);
    window.preview.bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = data.url;

    document.addEventListener('keydown', escCloseHandler);
  };

  window.bigSizePhoto = {
    closeBigPhoto: closeBigPhoto,
    closePopupHandler: closePopupHandler,
    showBigPhoto: showBigPhoto
  };
})();
