'use strict';

(function () {
  var uploadFileElement = document.querySelector('#upload-file');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadCancelElement = document.querySelector('.img-upload__cancel');
  var scaleControlElement = document.querySelector('.scale__control--value');
  var smallerControlElement = document.querySelector('.scale__control--smaller');
  var biggerControlElement = document.querySelector('.scale__control--bigger');
  var uploadPreviewElement = document.querySelector('.img-upload__preview');

  var STEP = 25;
  var MAX = 100;

  var uploadShow = function () {
    uploadOverlayElement.classList.remove('hidden');
    window.helpers.hideElement(window.effects.levelElement);
  };

  var uploadClose = function () {
    window.helpers.hideElement(uploadOverlayElement);
    document.removeEventListener('keydown', uploadCloseHandler);
  };

  var uploadCloseHandler = function (event) {
    if (
      event.keyCode === window.constants.ESC_KEYCODE &&
      !window.validity.inputElement.matches(':focus') &&
      !window.validity.textareaElement.matches(':focus')
    ) {
      uploadClose();
    }
  };

  var resizeBiggerHandler = function () {
    if (parseInt(scaleControlElement.value) < MAX) {
      var percent = parseInt(scaleControlElement.value) + STEP;

      scaleControlElement.value = percent + '%';
      uploadPreviewElement.style.transform = 'scale(' + percent / 100 + ')';
    }
  };

  var resizeSmallerHandler = function () {
    if (parseInt(scaleControlElement.value) > STEP) {
      var percent = parseInt(scaleControlElement.value) - STEP;

      scaleControlElement.value = percent + '%';
      uploadPreviewElement.style.transform = 'scale(' + percent / 100 + ')';
    }
  };

  document.addEventListener('keydown', uploadCloseHandler);
  uploadFileElement.addEventListener('change', uploadShow);
  biggerControlElement.addEventListener('click', resizeBiggerHandler);
  smallerControlElement.addEventListener('click', resizeSmallerHandler);
  uploadCancelElement.addEventListener('click', uploadClose);

  window.resize = {
    uploadClose: uploadClose
  }
})();
