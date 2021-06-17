require('dotenv').config()
// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region
AWS.config.update({
  region: 'ap-northeast-2'
});

it('load lib', async () => {
  expect(process.env.AWS_ACCESS_KEY_ID).not.toBe(undefined);
  var s3 = new AWS.S3();
  var data = await s3.listBuckets().promise();
  console.log(data.Buckets);
});
