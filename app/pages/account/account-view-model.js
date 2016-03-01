'use strict';

let Observable = require('data/observable').Observable;

class AccountViewModel extends Observable {
  constructor() {
    super();
    this.title = 'Account';
  }
}

module.exports = {
  AccountViewModel: AccountViewModel,
  defaultInstance: new AccountViewModel()
};