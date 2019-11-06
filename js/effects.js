'use strict';

(function () {
  var effectNone = document.querySelector('#effect-none');
  var effectChrome = document.querySelector('#effect-chrome');
  var effectSepia = document.querySelector('#effect-sepia');
  var effectMarvin = document.querySelector('#effect-marvin');
  var effectPhobos = document.querySelector('#effect-phobos');
  var effectHeat = document.querySelector('#effect-heat');

  var allEffects = {
    none: {
      element: effectNone,
      class: 'effects__preview--none',
      filter: 'none',
    },
    chrome: {
      element: effectChrome,
      class: 'effects__preview--chrome',
      filter: 'grayscale',
      max: 1,
      current: 0.5,
      min: 0
    },

    sepia: {
      element: effectSepia,
      class: 'effects__preview--sepia',
      filter: 'sepia',
      max: 1,
      current: 0.3,
      min: 0
    },
    marvin: {
      element: effectMarvin,
      class: 'effects__preview--marvin',
      filter: 'invert',
      max: 100,
      current: 0.2,
      min: 0
    },
    phobos: {
      element: effectPhobos,
      class: 'effects__preview--phobos',
      filter: 'blur',
      max: 3,
      current: 0.1,
      min: 0
    },
    heat: {
      element: effectHeat,
      class: 'effects__preview--heat',
      filter: 'brightness',
      max: 3,
      current: 0.6,
      min: 1
    }
  };

  var pin = document.querySelector('.effect-level__pin');
  var imagePreview = document.querySelector('.img-upload__preview');
  var line = document.querySelector('.effect-level__line');
  var currentEffect = allEffects.class; // ??????????
  // var levelValue = document.querySelector('.effect-level__value');

  var initPin = function (effect) {
    pin.style.left = effect.current * 100 + '%';
    currentEffect = effect;
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var moveRange = line.offsetWidth;
    var getNewOffsetLeft = function (shift) {
      var newOffsetLeft = (pin.offsetLeft - shift) / moveRange * 100;
      if (newOffsetLeft < 0) {
        newOffsetLeft = 0;
      } else if (newOffsetLeft > 100) {
        newOffsetLeft = 100;
      }
      return newOffsetLeft;
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      var newCoords = getNewOffsetLeft(shift);
      pin.style.left = newCoords + '%';
      var currentFilter = currentEffect.filter;
      imagePreview.style.filter = currentFilter + '(' + newCoords + '%)';
      currentEffect.current = newCoords / 100;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          pin.removeEventListener('click', onClickPreventDefault);
        };
        pin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var classReset = function (elements) {
    var list = Object.values(elements);
    for (var i = 0; i < list.length; i++) {
      imagePreview.classList.remove(list[i].class);
    }
  };

  var effectsHandler = function (object) {
    var list = Object.values(object);
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].element && list[i].class) {
        list[i].element.addEventListener('click', callBack(i, list));
      }
    }
  };

  var callBack = function (i, list) {
    return function () {
      classReset(list);
      initPin(list[i]);
      imagePreview.classList.add(list[i].class);
    };
  };

  effectsHandler(allEffects);
})();
