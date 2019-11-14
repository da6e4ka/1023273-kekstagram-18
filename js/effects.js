'use strict';

(function () {
  var pinElement = document.querySelector('.effect-level__pin');
  var previewElement = document.querySelector('.img-upload__preview');
  var lineElement = document.querySelector('.effect-level__line');
  var levelElement = document.querySelector('.effect-level');
  var colorDepthElement = document.querySelector('.effect-level__depth');

  var currentEffect = null;

  var effects = {
    none: {
      element: document.querySelector('#effect-none'),
      class: 'effects__preview--none',
      filter: 'none',
    },
    chrome: {
      element: document.querySelector('#effect-chrome'),
      class: 'effects__preview--chrome',
      filter: 'grayscale',
      max: 1,
      current: 1,
      min: 0
    },
    sepia: {
      element: document.querySelector('#effect-sepia'),
      class: 'effects__preview--sepia',
      filter: 'sepia',
      max: 1,
      current: 1,
      min: 0
    },
    marvin: {
      element: document.querySelector('#effect-marvin'),
      class: 'effects__preview--marvin',
      filter: 'invert',
      max: 100,
      current: 1,
      min: 0
    },
    phobos: {
      element: document.querySelector('#effect-phobos'),
      class: 'effects__preview--phobos',
      filter: 'blur',
      max: 3,
      current: 1,
      min: 0
    },
    heat: {
      element: document.querySelector('#effect-heat'),
      class: 'effects__preview--heat',
      filter: 'brightness',
      max: 3,
      current: 1,
      min: 0
    }
  };

  var resetStyles = function (elements) {
    var list = Object.values(elements);
    for (var i = 0; i < list.length; i++) {
      previewElement.classList.remove(list[i].class);
      previewElement.removeAttribute('style');
    }
  };

  var hideLineElement = function (element) {
    if (element.class === 'effects__preview--none') {
      levelElement.classList.add('hidden');
    } else {
      levelElement.classList.remove('hidden');
    }
  };

  var initPin = function (effect) {
    pinElement.style.left = effect.current * 100 + '%';
    colorDepthElement.style.width = pinElement.style.left;
    currentEffect = effect;
  };

  var getNewOffsetLeft = function (shift, rangeWidth) {
    var newOffsetLeft = (pinElement.offsetLeft - shift) / rangeWidth * 100;
    if (newOffsetLeft < 0) {
      newOffsetLeft = 0;
    } else if (newOffsetLeft > 100) {
      newOffsetLeft = 100;
    }
    return newOffsetLeft;
  };

  var handler = function (i, list) {
    return function () {
      hideLineElement(list[i]);
      resetStyles(list);
      initPin(list[i]);
      previewElement.classList.add(list[i].class);
    };
  };

  var setListenersToEffects = function (object) {
    var list = Object.values(object);
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].element && list[i].class) {
        list[i].element.addEventListener('click', handler(i, list));
      }
    }
  };

  setListenersToEffects(effects);

  var mouseDownHanlder = function (event) {
    event.preventDefault();

    var startPositionX = event.clientX;
    var rangeWidth = lineElement.offsetWidth;
    var dragged = false;

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();
      var currentFilter = currentEffect.filter;
      var shift = startPositionX - moveEvent.clientX;
      var offsetLeft = getNewOffsetLeft(shift, rangeWidth);

      dragged = true;
      startPositionX = moveEvent.clientX;
      pinElement.style.left = offsetLeft + '%';
      colorDepthElement.style.width = offsetLeft + '%';

      if (currentFilter === 'blur') {
        previewElement.style.filter = currentFilter + '(' + Math.floor(offsetLeft / 33) + 'px)';
      } else {
        previewElement.style.filter = currentFilter + '(' + offsetLeft + '%)';
      }

      currentEffect.current = offsetLeft / 100;
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          pinElement.removeEventListener('click', onClickPreventDefault);
        };
        pinElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinElement.addEventListener('mousedown', mouseDownHanlder);

  window.effects = {
    levelElement: levelElement
  };
})();
