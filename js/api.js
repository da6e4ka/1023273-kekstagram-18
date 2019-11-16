'use strict';

(function () {
  var Errors = {
    CONNECTION_ERROR: 'При установлении соединения произошла ошибка',
    TIMEOUT_ERROR: 'Запрос превысил интервал ожидания',
    UNEXPECTED_ERROR: 'Произошла ошибка'
  };

  var ajax = function (URL, TYPE, data, onSuccess, onError, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        if (onLoad) {
          onLoad(xhr.response);
        }
        if (onSuccess) {
          onSuccess(xhr.response);
        }
      } else {
        if (onError) {
          onError(Errors.UNEXPECTED_ERROR);
        }
      }
    });

    xhr.addEventListener('error', function () {
      if (onError) {
        onError(Errors.CONNECTION_ERROR);
      }
    });

    xhr.addEventListener('timeout', function () {
      if (onError) {
        onError(Errors.TIMEOUT_ERROR);
      }
    });

    xhr.timeout = window.constants.CONNECTION_TIMEOUT;

    xhr.open(TYPE, URL);
    xhr.send(data);
  };

  var load = function (URL, onSuccess, onError) {
    ajax(URL, 'GET', null, onSuccess, onError, null);
  };

  var request = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram';
    ajax(URL, 'POST', data, null, onError, onLoad);
  };

  window.api = {
    load: load,
    request: request
  };
})();
