'use strict';
const BASE_URL = 'https://bg-tourist-guide-server.herokuapp.com';
let http = require('http');
let users = require('../helpers/users-helper').defaultInstance;

class Requester {
  getJsonAsync(url) {
    let promise = new Promise(function (resolve, reject) {
      let user = users.getCurrentUserFromLocalStorage();
      let headers = {
        'Content-Type': 'application/json'
      };

      if (user && user.token) {
        headers.Authentication = 'Bearer ' + user.token;
      }

      http.request({
        url: BASE_URL + url,
        method: 'GET',
        headers: headers
      })
        .then(function (response) {
          resolve(response.content.toJSON());
        }, reject);
    });

    return promise;
  }

  postJsonAsync(url, data) {
    let promise = new Promise(function (resolve, reject) {
      let user = users.getCurrentUserFromLocalStorage();
      let headers = {
        'Content-Type': 'application/json'
      };

      if (user && user.token) {
        headers.Authentication = 'Bearer ' + user.token;
      }

      http.request({
        url: BASE_URL + url,
        method: 'POST',
        headers: headers,
        content: JSON.stringify(data)
      })
        .then(function (response) {
          resolve(response.content.toJSON());
        }, reject);
    });

    return promise;
  }

  putJsonAsync(url, data) {
    let promise = new Promise(function (resolve, reject) {
      let user = users.getCurrentUserFromLocalStorage();
      let headers = {
        'Content-Type': 'application/json'
      };

      if (user && user.token) {
        headers.Authentication = 'Bearer ' + user.token;
      }

      http.request({
        url: BASE_URL + url,
        method: 'PUT',
        headers: headers,
        content: JSON.stringify(data)
      })
        .then(function (response) {
          resolve(response.content.toJSON());
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  Requester: Requester,
  defaultInstance: new Requester()
};