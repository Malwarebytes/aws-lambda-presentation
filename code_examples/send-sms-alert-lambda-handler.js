'use strict';
const AWS = require('aws-sdk');

console.log('Loading SMS alerts lambda function');
// This Lambda will be triggered on Cloudwatch logs events
// The Cloudwatch logs filter pattern will be { $.eventType = "fatal" } 
// to trigger the lambda
exports.handler = (event, context, callback) => {
  const PHONE_NUMBER = process.env.PHONE_NUMBER
  // We can parse the event and get the cloudwatch log message
  // but for the sake of the example we will use a a generic alert msg
  const sns = new AWS.SNS();
  sns.publish({
    Message: 'AWS APP ALERT: File Processing Lambda, Error: S3 bucket error.',
    PhoneNumber:PHONE_NUMBER,
    MessageStructure: 'sms'
  }, (err, data) => {
    if (err) callback(err, 'Failed to send sms alert!');
    else callback(null, 'sms alert sent!');
  });
};
