'use strict';

window.getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

window.getRandomArrayElement = function (arr) {
  return arr[Math.floor(arr.length * Math.random())];
};

var pictures = document.querySelector('.pictures');

var generatePhotosMock = function () {
  var mocks = [];
  for (var i = 1; i <= 25; i++) {
    mocks.push(getPhotoMock(i));
  }
  return mocks;
};

var getPhotoMock = function (index) {
  var commentVariants = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptionVariants = [
    'Ну типа фотка',
    'Еще сфоткал вот смотрите',
    'Продам гараж'
  ];


  var comments = [];
  for (var i = 0; i < window.getRandomInt(5, 23); i++) {
    comments.push(window.getRandomArrayElement(commentVariants));
  }

  return {
    url: 'photos/' + index + '.jpg',
    description: window.getRandomArrayElement(descriptionVariants),
    likes: window.getRandomInt(15, 200),
    comments: comments,
  };
};


function renderImages(photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderImageTemplate(photos[i]));
  }

  return fragment;
}

function renderImageTemplate(photo) {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var userImage = template.cloneNode(true);

  userImage.querySelector('.picture__img').src = photo.url;
  userImage.querySelector('.picture__likes').textContent = photo.likes.toString();
  userImage.querySelector('.picture__comments').textContent = photo.comments.length.toString();

  return userImage;
}

function renderCommentTemplate(comment) {
  var template = document.querySelector('#comment').content;
  var userComment = template.cloneNode(true);

  userComment.querySelector('.social__picture').src = 'img/avatar-'+window.getRandomInt(1, 6)+'.svg';
  userComment.querySelector('.social__picture').setAttribute('alt', 'Ромка');
  userComment.querySelector('.social__text').textContent = comment;

  return userComment;
}

function renderComments(comments) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(renderCommentTemplate(comments[i]))
  }

  return fragment;
}

function showBigPicture(photo) {
  var bigPicture = document.querySelector('.big-picture')
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', photo.url);
  bigPicture.querySelector('.social__caption').textContent = photo.description.toString();
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length.toString();

  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.social__comments').appendChild(renderComments(photo.comments))

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden')
}

var photos = generatePhotosMock();
pictures.appendChild(renderImages(photos));
showBigPicture(photos[0]);
