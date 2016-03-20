'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let commentsService = require('../../../web/services/comments-service').defaultInstance;
let users = require('../../../helpers/users-helper').defaultInstance;
let moment = require('moment');

class ListCommentsViewModel extends Observable {
  constructor(touristSite) {
    super();
    this.title = touristSite ? touristSite.title : '';
    this.currentUser = users.getCurrentUserFromLocalStorage();
    this.touristSite = touristSite;
    this.comments = new ObservableArray([]);
    this.page = 0;
    this.isLoading = false;
  }

  loadComments() {
    this.page++;
    this.set('isLoading', true);
    let that = this;

    let promise = new Promise(function(resolve, reject) {
      commentsService.getForPage(that.touristSite._id, that.page)
        .then(function(data) {
          data.forEach(function(item) {
            item.formatedDate = that.formatDate(item.commentedOn);
            that.comments.push(item);
          });

          that.set('isLoading', false);

          resolve(true);
        }, function(err) {
          that.set('isLoading', false);
          reject(err);
        });
    });

    return promise;
  }

  formatDate(date) {
    return moment().format('Do MMMM YYYY, h:mm');
  }
}

module.exports = {
  ListCommentsViewModel: ListCommentsViewModel,
  defaultInstance: new ListCommentsViewModel(null)
};