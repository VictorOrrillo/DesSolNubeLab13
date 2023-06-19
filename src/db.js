import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAVCYQDEOVJGMARBUD',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;