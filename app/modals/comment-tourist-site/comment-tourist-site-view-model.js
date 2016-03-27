'use strict';

let Observable = require('data/observable').Observable;
let commentsSitesService = require('../../web/services/comments-service').defaultInstance;
let usersHelper = require('../../helpers/users-helper').defaultInstance;

class CommentTouristSiteViewModel extends Observable {
  constructor(touristSite) {
    super();

    if (touristSite) {
      this.touristSite = touristSite;
    }

    this.comment = "";
  }

  commentTouristSite() {
    let that = this;
    let comment = {
      touristSiteId: this.touristSite._id,
      content: this.comment
    };

    let promise = new Promise(function(resolve, reject) {
      commentsSitesService.addComment(comment)
        .then(function(dbTouristSite) {
          resolve(dbTouristSite);
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  CommentTouristSiteViewModel: CommentTouristSiteViewModel,
  defaultInstance: new CommentTouristSiteViewModel()
};