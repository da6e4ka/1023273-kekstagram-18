'use strict';

(function () {
  var MAX_IMAGES_CUNT = 25;
  var images = [];

  var Likes = {
    MINIMUM: 15,
    MAXIMUM: 200
  };

  var Messages = {
    MINIMUM: 1,
    MAXIMUM: 20
  };

  for (var imageNumber = 1; imageNumber <= MAX_IMAGES_CUNT; imageNumber++) {
    images.push({
      url: 'photos/' + imageNumber + '.jpg',
      likes: window.helpers.getRandomNumber(Likes.MINIMUM, Likes.MAXIMUM),
      messages: window.helpers.getRandomNumber(Messages.MINIMUM, Messages.MAXIMUM)
    });
  }

  window.images = images;
})();
