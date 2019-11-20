'use strict';

(function () {
  var COMMENTS_STEP = 5;
  var picturesElement = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture').content.querySelector('.picture');
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureSocialElement = bigPictureElement.querySelector('.big-picture__social');
  var pictureCancelElement = bigPictureElement.querySelector('#picture-cancel');
  var socialCommentsElement = document.querySelector('.social__comments');
  var commentsLoaderElement = document.querySelector('.comments-loader');
  var uploadFormElement = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');
  var commentTemplate = document.querySelector('#comment').content;

  var renderComments = function (comments, number, from) {
    for (var i = from; i < comments.length && i < number; i++) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.helpers.getRandomNumber(1, 6) + '.svg';
      commentElement.querySelector('.social__text').textContent = comments[i].message;
      socialCommentsElement.appendChild(commentElement);
    }

    bigPictureSocialElement.querySelector('.comments-count')
      .textContent = number > comments.length ? comments.length : number;
    bigPictureSocialElement.querySelector('.total-comments-count').textContent = comments.length;

    if (number > comments.length) {
      commentsLoaderElement.classList.add('visually-hidden');
    } else {
      commentsLoaderElement.classList.remove('visually-hidden');
    }
  };

  function renderTemplate(image) {
    var userImage = templateElement.cloneNode(true);

    userImage.querySelector('.picture__img').src = image.url;
    userImage.querySelector('.picture__likes').textContent = image.likes;
    userImage.querySelector('.picture__comments').textContent = image.comments.length;
    userImage.addEventListener('click', function () {
      var commentsCount = COMMENTS_STEP;

      while (socialCommentsElement.firstChild) {
        socialCommentsElement.removeChild(socialCommentsElement.firstChild);
      }

      bigPictureSocialElement.querySelector('.social__likes').querySelector('.likes-count').textContent = image.likes;
      bigPictureSocialElement.querySelector('.social__caption').textContent = image.description;

      window.bigSizePhoto.showBigPhoto(image);
      renderComments(image.comments, commentsCount, 0);

      commentsLoaderElement.addEventListener('click', function () {
        commentsCount += COMMENTS_STEP;
        renderComments(image.comments, commentsCount, commentsCount - COMMENTS_STEP);
      });
    });

    pictureCancelElement.addEventListener('click', function () {
      window.bigSizePhoto.closeBigPhoto(image);
    });

    return userImage;
  }

  var getImage = function (array) {
    var fragment = document.createDocumentFragment();
    var filters = document.querySelector('.img-filters');

    array.forEach(function (element) {
      fragment.appendChild(renderTemplate(element));
    });

    picturesElement.appendChild(fragment);

    filters.classList.remove('img-filters--inactive');
  };

  var successHandler = function (data) {
    var photos = data;
    getImage(window.filter.sortByPopularity(photos));

    var popularPhotosHandler = window.debounce(function (evt) {
      window.filter.removePictures();
      window.filter.removeFilter();

      getImage(window.filter.sortByPopularity(photos));

      evt.target.classList.add('img-filters__button--active');
    });

    var randomPhotosHandler = window.debounce(function (evt) {
      window.filter.removePictures();
      window.filter.removeFilter();
      var uniquePhotos =
        photos.filter(function (it, i) {
          return photos.indexOf(it) === i;
        });
      window.debounce(getImage(window.helpers.sortRandomPhotos(uniquePhotos)));
      evt.target.classList.add('img-filters__button--active');
    });

    var discussedPhotosHandler = window.debounce(function (evt) {
      window.filter.removePictures();
      window.filter.removeFilter();
      window.debounce(getImage(window.helpers.sortByComments(photos)));
      evt.target.classList.add('img-filters__button--active');
    });

    window.filter.popularFilterElement.addEventListener('click', popularPhotosHandler);
    window.filter.discussedFilterElement.addEventListener('click', discussedPhotosHandler);
    window.filter.randomFilterElement.addEventListener('click', randomPhotosHandler);

  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.api.load(window.constants.DATA_URL, successHandler, errorHandler);


  var sendFormCallback = function () {
    window.helpers.hideElement(uploadFormElement);
    openSuccess();
  };

  uploadFormElement.addEventListener('submit', function (e) {
    e.preventDefault();

    window.api.request(new FormData(uploadFormElement), sendFormCallback, openError);
  });

  var openSuccess = function () {
    var successTemplate = document.querySelector('#success').content;
    var successPopup = successTemplate.cloneNode(true).querySelector('.success');

    mainElement.appendChild(successPopup);

    var successButton = document.querySelector('.success__button');
    var closeSuccessHandler = function () {
      mainElement.removeChild(successPopup);
      window.helpers.showElement(uploadFormElement);
      window.resize.uploadClose();
      successButton.removeEventListener('click', closeSuccessHandler);
      document.removeEventListener('keydown', escSuccessHandler);
    };

    var escSuccessHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        closeSuccessHandler();
      }
    };

    successButton.addEventListener('click', closeSuccessHandler);

    document.addEventListener('keydown', escSuccessHandler);
  };

  var openError = function () {
    window.helpers.hideElement(uploadFormElement);
    var errorTemplate = document.querySelector('#error').content;

    var errorPopup = errorTemplate.cloneNode(true).querySelector('.error');

    mainElement.appendChild(errorPopup);

    var errorButton = document.querySelector('.error__button');

    var closeErrorHandler = function () {
      mainElement.removeChild(errorPopup);
      errorButton.removeEventListener('click', closeErrorHandler);
      document.removeEventListener('keydown', escErrorHandler);
    };

    errorButton.addEventListener('click', closeErrorHandler);

    var escErrorHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        closeErrorHandler();
      }
    };

    document.addEventListener('keydown', escErrorHandler);

    document.addEventListener('click', function (evt) {
      if (evt.target === errorPopup) {
        closeErrorHandler();
      }
    });

  };

  window.preview = {
    bigPictureElement: bigPictureElement,
    bigPictureSocialElement: bigPictureSocialElement,
    picturesElement: picturesElement
  };
})();

