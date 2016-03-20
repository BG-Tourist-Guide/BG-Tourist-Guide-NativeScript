'use strict';

let requester = require('../requester').defaultInstance;
let responseHelper = require('../helpers/response-helper').defaultInstance;

class CommentsService {
  getForPage(touristSiteId, page) {
    page = page || 0;
    
    let promise = new Promise(function(resolve, reject) {
      requester.getJsonAsync(`/api/comments/${touristSiteId}?page=${page}`)
        .then(function(response) {
          responseHelper.handleResponseInPromise(response, resolve, reject);
        });
    });

    return promise;
  }

  addComment(comment) {
    let promise = new Promise(function(resolve, reject) {
      requester.postJsonAsync('/api/comments', comment)
        .then(function(response) {
          responseHelper.handleResponseInPromise(response, resolve, reject);
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  CommentsService: CommentsService,
  defaultInstance: new CommentsService()
};