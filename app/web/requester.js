'use strict';
const BASE_URL = 'https://bg-tourist-guide-server.herokuapp.com';
let http = require('http');
let users = require('../services/users-service').defaultInstance;

class Requester {
  getJsonAsync(url) {
    let promise = new Promise(function (resolve, reject) {
      users.getCurrentUserFromLocalStorage()
        .then(function (user) {
          let headers = {
              'Content-Type': 'application/json'
            };
            
          if (user && user.token) {
            headers.Authentication = 'Bearer ' + user.token;
          }
          
          return http.request({
            url: BASE_URL + url,
            method: 'GET',
            headers: headers
          });
        }, reject)
        .then(function (response) {
          resolve(response.content.toJSON());
        }, reject);
    });

    return promise;
  }
  
  postJsonAsync(url, data) {
    let promise = new Promise(function (resolve, reject) {
      users.getCurrentUserFromLocalStorage()
        .then(function (user) {
          let headers = {
              'Content-Type': 'application/json'
            };
            
          if (user && user.token) {
            headers.Authentication = 'Bearer ' + user.token;
          }
          
          return http.request({
            url: BASE_URL + url,
            method: 'POST',
            headers: headers,
            content: JSON.stringify(data)
          });
        }, reject)
        .then(function (response) {
          resolve(response.content.toJSON());
        }, reject);
    });
    
    return promise;
  }
  
  putJsonAsync(url, data) {
    let promise = new Promise(function (resolve, reject) {
      users.getCurrentUserFromLocalStorage()
        .then(function (user) {
          let headers = {
              'Content-Type': 'application/json'
            };
            
          if (user && user.token) {
            headers.Authentication = 'Bearer ' + user.token;
          }
          
          return http.request({
            url: BASE_URL + url,
            method: 'PUT',
            headers: headers,
            content: JSON.stringify(data)
          });
        }, reject)
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