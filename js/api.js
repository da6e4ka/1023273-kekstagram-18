'use strict';

(function () {
  var Errors = {
    CONNECTION_ERROR: 'При установлении соединения произошла ошибка',
    TIMEOUT_ERROR: 'Запрос превысил интервал ожидания',
    UNEXPECTED_ERROR: 'Произошла ошибка'
  };

  var load = function (URL, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(Errors.UNEXPECTED_ERROR);
      }
    });
    xhr.addEventListener('error', function () {
      onError(Errors.CONNECTION_ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(Errors.TIMEOUT_ERROR);
    });

    xhr.timeout = window.constants.CONNECTION_TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  var request = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/kekstagram';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(Errors.UNEXPECTED_ERROR);
      }
    });

    xhr.addEventListener('error', function () {
      onError(Errors.CONNECTION_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(Errors.TIMEOUT_ERROR);
    });

    xhr.timeout = window.constants.CONNECTION_TIMEOUT;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.api = {
    load: load,
    request: request
  };
})();
