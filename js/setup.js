'use strict';

(function () {

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var coatColor;
  var eyesColor;

  var userDialog = document.querySelector('.setup');

  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var coatColorInput = userDialog.querySelector('input[name=coat-color]');
  wizardCoat.addEventListener('click', function (evt) {
    evt.preventDefault();
    var newColor = window.helpers.getRandomValue(COAT_COLORS);
    wizardCoat.style.fill = newColor;
    coatColorInput.value = newColor;
    onCoatChange(newColor);
  });

  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var eyesColorInput = userDialog.querySelector('input[name=eyes-color]');
  wizardEyes.addEventListener('click', function (evt) {
    evt.preventDefault();
    var newColor = window.helpers.getRandomValue(EYES_COLORS);
    wizardEyes.style.fill = newColor;
    eyesColorInput.value = newColor;
    onEyesChange(newColor);
  });

  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var fireballColorInput = userDialog.querySelector('input[name=fireball-color]');
  // var fireballColor;
  wizardFireball.addEventListener('click', function (evt) {
    evt.preventDefault();
    var newColor = window.helpers.getRandomValue(FIREBALL_COLORS);
    wizardFireball.style.background = newColor;
    fireballColorInput.value = newColor;
    // fireballColor = newColor;
  });

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(window.backend.URL, new FormData(form), successSaveHandler, errorHandler);
  });

  var wizards = [];
  var successLoadHandler = function (data) {
    wizards = data;
    window.render(wizards);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successSaveHandler = function () {
    userDialog.classList.add('hidden');
  };

  window.backend.load(window.backend.URL, successLoadHandler, errorHandler);

})();
