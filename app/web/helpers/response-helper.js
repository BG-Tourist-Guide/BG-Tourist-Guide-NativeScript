'use strict';

class ResponseHeler {
  handleResponseInPromise(response, resolve, reject) {
    if (!response.result) {
      reject({
        message: response.message
      });

      return;
    }
    
    resolve(response.result);
  }
}

module.exports = {
  ResponseHeler: ResponseHeler,
  defaultInstance: new ResponseHeler()
};