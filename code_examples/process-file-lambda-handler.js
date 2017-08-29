'use strict';

console.log('Loading process file lambda function');

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.handler = (event, context, callback) => {
    // Env Variable OUTPUT_S3_BUCKET is the output S3 bucket
    const OUTPUT_S3_BUCKET = process.env.OUTPUT_S3_BUCKET;
    // Get the object from the event then save its content to another bucket
    const INPUT_S3_BUCKET = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: INPUT_S3_BUCKET,
        Key: key,
    };
    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err);
            const message = `Error getting object ${key} from bucket ${bucket}. 
                             Make sure they exist and your bucket is in the same region as this function.`;
            console.log(message);
            callback(message);
        } else {
            console.log(data);
            console.log('Do something with the file, may be resize, compress, etc...');
            console.log('file processing in progress....');
            // after our file processing is done, save our file to a different S3 object
            var params = {
                Body: data.Body,
                Bucket: OUTPUT_S3_BUCKET,
                Key: "malwarebytes-processed.jpg"
              };
              s3.putObject(params, function(err, data) {
               if (err){
                   console.log(err, err.stack); // an error occurred
                   const message = `Error saving object ${params.Key} to bucket ${OUTPUT_S3_BUCKET}.`;
                   callback(message);
               }else{
                console.log(`Successfully saved file: ${JSON.stringify(data)}`); // successful
                callback(null, "Done!");
               }
              });
        }
    });
};
