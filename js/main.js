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
  for (var i = 0; i < window.getRandomInt(3, 10); i++) {
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
    fragment.appendChild(renderTemplate(photos[i]));
  }

  return fragment;
}

function renderTemplate(photo) {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var userImage = template.cloneNode(true);

  userImage.querySelector('.picture__img').src = photo.url;
  userImage.querySelector('.picture__likes').textContent = photo.likes.toString();
  userImage.querySelector('.picture__comments').textContent = photo.comments.length.toString();

  return userImage;
}

pictures.appendChild(renderImages(generatePhotosMock()));
