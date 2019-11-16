'use strict';

(function () {
  var MAX_IMAGES_CUNT = 25;
  var images = [];

  var likes = {
    minimum: 15,
    maximum: 200
  };

  var messages = {
    minimum: 1,
    maximum: 20
  };

  for (var imageNumber = 1; imageNumber <= MAX_IMAGES_CUNT; imageNumber++) {
    images.push({
      url: 'photos/' + imageNumber + '.jpg',
      likes: window.helpers.getRandomNumber(likes.minimum, likes.maximum),
      messages: window.helpers.getRandomNumber(messages.minimum, messages.maximum)
    });
  }

  window.images = images;
})();
