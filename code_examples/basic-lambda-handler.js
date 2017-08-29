'use strict';
console.log('Loading lambda function');

exports.handler = (event, context, callback) => {
    // Lambda Event
    console.log('Received event:', JSON.stringify(event, null, 2)); 
    // Lambda Action
    callback(null, 'Done!');  // Echo back a success message
    //callback('Something went wrong'); // Error callback 
};
