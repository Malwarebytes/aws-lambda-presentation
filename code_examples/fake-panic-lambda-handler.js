'use strict';

console.log('Loading lambda function');
exports.handler = (event, context, callback) => {
    var errObject = {
      eventType: 'fatal',
      service: 'file processing service',
      msg: 's3 bucket error',
      code: '403'
    };
    console.error(JSON.stringify(errObject));
    callback('Something went wrong');
};
