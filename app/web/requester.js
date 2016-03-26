'use strict';
const BASE_URL = 'https://bg-tourist-guide-server.herokuapp.com';
// const BASE_URL = 'http://192.168.1.102:4000';
let http = require('http');
let users = require('../helpers/users-helper').defaultInstance;

class Requester {
  getJsonAsync(url, ignoreBaseUrl) {
    let promise = new Promise(function(resolve, reject) {
      let user = users.getCurrentUserFromLocalStorage();
      let headers = createHeaders(user);

      let finalUrl = BASE_URL + url;

      if (ignoreBaseUrl) {
        finalUrl = url;
      }

      http.request({
        url: finalUrl,
        method: 'GET',
        headers: headers
      })
        .then(function(response) {
          handleResponse(response, resolve, reject);
        }, reject);
    });

    return promise;
  }

  postJsonAsync(url, data) {
    let promise = new Promise(function(resolve, reject) {
      let user = users.getCurrentUserFromLocalStorage();
      let headers = createHeaders(user);

      http.request({
        url: BASE_URL + url,
        method: 'POST',
        headers: headers,
        content: JSON.stringify(data)
      })
        .then(function(response) {
          handleResponse(response, resolve, reject);
        }, reject);
    });

    return promise;
  }

  putJsonAsync(url, data) {
    let promise = new Promise(function(resolve, reject) {
      let user = users.getCurrentUserFromLocalStorage();
      let headers = createHeaders(user);

      http.request({
        url: BASE_URL + url,
        method: 'PUT',
        headers: headers,
        content: JSON.stringify(data)
      })
        .then(function(response) {
          handleResponse(response, resolve, reject);
        }, reject);
    });

    return promise;
  }
}

function createHeaders(user) {
  let headers = {
    'Content-Type': 'application/json'
  };

  if (user && user.token) {
    headers.Authorization = 'Bearer ' + user.token;
  }

  return headers;
}

function checkStatusCodeForError(response) {
  if (response.statusCode >= 400) {
    return true;
  }
  else {
    return false;
  }
}

function handleResponse(response, resolve, reject) {
  let hasError = checkStatusCodeForError(response);

  if (hasError) {
    reject({
      message: 'Server responded with error status code.'
    });
    return;
  }

  resolve(response.content.toJSON());
}

module.exports = {
  Requester: Requester,
  defaultInstance: new Requester()
};