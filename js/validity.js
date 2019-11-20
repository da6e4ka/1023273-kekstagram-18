'use strict';

(function () {
  var formElement = document.querySelector('#upload-select-image');
  var inputElement = formElement.querySelector('.text__hashtags');
  var buttonElement = formElement.querySelector('#upload-submit');
  var textareaElement = document.querySelector('.text__description');

  var Rules = {
    MAX_COMMENT_LENGTH: 140,
    START_SYMBOL: '#',
    START_POSITION: 0,
    MAX_COUNT: 5,
    MAX_LENGTH: 20,
  };

  var setErrorBorder = function (element) {
    element.style.borderColor = 'red';
  };

  var resetErrorBorder = function (element) {
    if (element) {
      element.style.borderColor = 'white';
    }
  };

  var validateComment = function (comment) {
    if (comment.length > Rules.MAX_COMMENT_LENGTH) {
      textareaElement.setCustomValidity('Длина комментария не может составлять больше 140 символов;');
      setErrorBorder(textareaElement);
      return false;
    }
    return true;
  };

  var checkDoubleHashtags = function (tags) {
    for (var i = 0; i < tags.length; i++) {
      for (var t = 0; t < tags.length; t++) {
        if (tags[i] === tags[t] && i !== t) {
          return true;
        }
      }
    }
    return false;
  };

  var validateHashtag = function (hashtag) {
    var isLong = hashtag.length > Rules.MAX_LENGTH;
    var isWrong = hashtag[0] !== '#';
    var isEmpty = hashtag === '#';
    var isSpace = hashtag.indexOf(Rules.START_SYMBOL, 1) > 1;

    if (isLong) {
      inputElement.setCustomValidity('Максимальная длинна - 20 символов');
      return false;
    }

    if (isWrong) {
      inputElement.setCustomValidity('Хэш-тэг должен начинаться с символа #');
      return false;
    }

    if (isEmpty) {
      inputElement.setCustomValidity('Хэш-тэг не может быть пустым');
      return false;
    }

    if (isSpace) {
      inputElement.setCustomValidity('Хэш-тэги разделяются пробелами');
      return false;
    }

    inputElement.setCustomValidity('');
    return true;
  };

  var validateHashtags = function (tags) {
    var isDouble = checkDoubleHashtags(tags);
    if (isDouble) {
      inputElement.setCustomValidity('Ваши хэш-теги повторяются');
      return false;
    }

    var isTooMany = tags.length > Rules.MAX_COUNT;
    if (isTooMany) {
      inputElement.setCustomValidity('Максимум может быть 5 хэш-тегов');
      return false;
    }
    return true;
  };

  var validate = function (tags) {
    var result = true;
    result = result && validateHashtags(tags);
    for (var i = 0; i < tags.length; i++) {
      var hastag = tags[i];
      result = result && validateHashtag(hastag);
      if (!result) {
        break;
      }
    }
    if (result) {
      inputElement.setCustomValidity('');
    } else {
      setErrorBorder(inputElement);
    }
  };

  var validationHandler = function () {
    var hashtags = inputElement.value.toLowerCase().split(' ');
    if (inputElement.value !== '') {
      validate(hashtags);
    }
    var comments = textareaElement.value.split('');
    if (textareaElement.value !== '') {
      validateComment(comments);
    }
  };

  var resetValidity = function() {
    resetErrorBorder(inputElement);
    inputElement.setCustomValidity('');
    textareaElement.value = '';
    inputElement.value = '';
  };

  buttonElement.addEventListener('click', validationHandler);

  window.validity = {
    inputElement: inputElement,
    textareaElement: textareaElement,
    resetValidity: resetValidity
  };
})();
