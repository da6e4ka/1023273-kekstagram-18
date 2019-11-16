'use strict';

(function () {
  var STEP = 25;
  var MAX = 100;
  var RADIX = 10;

  var uploadFileElement = document.querySelector('#upload-file');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadCancelElement = document.querySelector('.img-upload__cancel');
  var scaleControlElement = document.querySelector('.scale__control--value');
  var smallerControlElement = document.querySelector('.scale__control--smaller');
  var biggerControlElement = document.querySelector('.scale__control--bigger');
  var uploadPreviewElement = document.querySelector('.img-upload__preview');

  var uploadShowHandler = function () {
    uploadPreviewElement.style.transform = 'scale(1)';
    uploadOverlayElement.classList.remove('hidden');
    window.helpers.hideElement(window.effects.levelElement);
  };

  var uploadCloseHandler = function () {
    window.helpers.hideElement(uploadOverlayElement);
    document.removeEventListener('keydown', uploadCloseHandler);
  };

  var uploadCloseHandler = function (event) {
    if (
      event.keyCode === window.constants.ESC_KEYCODE &&
      !window.validity.inputElement.matches(':focus') &&
      !window.validity.textareaElement.matches(':focus')
    ) {
      uploadCloseHandler();
    }
  };

  var resizeBiggerHandler = function () {
    if (parseInt(scaleControlElement.value, RADIX) < MAX) {
      var percent = parseInt(scaleControlElement.value, RADIX) + STEP;

      scaleControlElement.value = percent + '%';
      uploadPreviewElement.style.transform = 'scale(' + percent / MAX + ')';
    }
  };

  var resizeSmallerHandler = function () {
    if (parseInt(scaleControlElement.value, RADIX) > STEP) {
      var percent = parseInt(scaleControlElement.value, RADIX) - STEP;

      scaleControlElement.value = percent + '%';
      uploadPreviewElement.style.transform = 'scale(' + percent / MAX + ')';
    }
  };

  document.addEventListener('keydown', uploadCloseHandler);
  uploadFileElement.addEventListener('change', uploadShowHandler);
  biggerControlElement.addEventListener('click', resizeBiggerHandler);
  smallerControlElement.addEventListener('click', resizeSmallerHandler);
  uploadCancelElement.addEventListener('click', uploadCloseHandler);

  window.resize = {
    uploadCloseHandler: uploadCloseHandler,
    uploadPreviewElement: uploadPreviewElement
};
})();
