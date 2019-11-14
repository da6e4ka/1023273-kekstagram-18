'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture').content.querySelector('.picture');
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureSocialElement = bigPictureElement.querySelector('.big-picture__social');
  var pictureCancelElement = bigPictureElement.querySelector('#picture-cancel');
  var socialCommentsElement = document.querySelector('.social__comments');
  var commentsLoaderElement = document.querySelector('.comments-loader');
  var uploadFormElement = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');

  var commentsCount = 5;

  var renderComments = function (comments, number) {
    socialCommentsElement.innerHTML = '';

    for (var i = 0; i < comments.length && i < number; i++) {
      socialCommentsElement.innerHTML +=
        '<li class="social__comment">'
        + '<img class="social__picture" src="img/avatar-' + window.helpers.getRandomNumber(1, 6) + '.svg" width="35"'
        + 'height="35">'
        + '<p class="social__text">' + comments[i].message + '</p>'
        + '</li>';
    }

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
    userImage.querySelector('.picture__comments').textContent = image.messages;
    userImage.addEventListener('click', function () {
      bigPictureSocialElement.querySelector('.social__likes').querySelector('.likes-count').textContent = image.likes;
      bigPictureSocialElement.querySelector('.social__comment-count').querySelector('.comments-count').textContent = image.messages;
      bigPictureSocialElement.querySelector('.social__caption').textContent = image.description;
      bigPictureSocialElement.querySelector('.comments-count').textContent = image.comments.length;
      window.fullsize.showBigPhoto(image);
      renderComments(image.comments, commentsCount);

      commentsLoaderElement.addEventListener('click', function () {
        commentsCount += 5;
        renderComments(image.comments, commentsCount);
      });
    });

    pictureCancelElement.addEventListener('click', function () {
      window.fullsize.closeBigPhoto(image);
    });

    return userImage;
  }

  var getImage = function (array) {
    var fragment = document.createDocumentFragment();
    var filters = document.querySelector('.img-filters');

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderTemplate(array[i]));
    }

    picturesElement.appendChild(fragment);
    filters.classList.remove('img-filters--inactive');
  };

  var successHandler = function (data) {
    var photos = data;
    getImage(photos);

    var popularPhotosHandler = window.debounce(function (event) {
      window.sort.removePictures();
      window.sort.removeFilter();
      getImage(photos);
      event.target.classList.add('img-filters__button--active');
    });

    var randomPhotosHandler = window.debounce(function (event) {
      window.sort.removePictures();
      window.sort.removeFilter();
      var uniquePhotos =
        photos.filter(function (it, i) {
          return photos.indexOf(it) === i;
        });
      window.debounce(getImage(window.helpers.sortRandomPhotos(uniquePhotos)));
      event.target.classList.add('img-filters__button--active');
    });

    var discussedPhotosHandler = window.debounce(function (event) {
      window.sort.removePictures();
      window.sort.removeFilter();
      window.debounce(getImage(window.helpers.sortByComments(photos)));
      event.target.classList.add('img-filters__button--active');
    });

    window.sort.popularFilterElement.addEventListener('click', popularPhotosHandler);
    window.sort.discussedFilterElement.addEventListener('click', discussedPhotosHandler);
    window.sort.randomFilterElement.addEventListener('click', randomPhotosHandler);

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

  window.backend.load(window.constants.DATA_URL, successHandler, errorHandler);


  var sendFormCallback = function () {
    window.helpers.hideElement(uploadFormElement);
    openSuccess();
  };

  uploadFormElement.addEventListener('submit', function (e) {
    e.preventDefault();

    window.backend.request(new FormData(uploadFormElement), sendFormCallback, openError);
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

    successButton.addEventListener('click', closeSuccessHandler);

    var escSuccessHandler = function (event) {
      if (event.keyCode === window.constants.ESC_KEYCODE) {
        closeSuccessHandler();
      }
    };

    document.addEventListener('keydown', escSuccessHandler);

    document.addEventListener('click', function (event) {
      if (event.target === successPopup) {
        closeSuccessHandler();
      }
    });
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

    var escErrorHandler = function (event) {
      if (event.keyCode === window.constants.ESC_KEYCODE) {
        closeErrorHandler();
      }
    };

    document.addEventListener('keydown', escErrorHandler);

    document.addEventListener('click', function (event) {
      if (event.target === errorPopup) {
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

