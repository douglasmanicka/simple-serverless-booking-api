'use strict';

const AWS =  require('aws-sdk')
const converter =  AWS.DynamoDB.Converter 


module.exports.listen = async event => {
  for (const record of event.Records) {
    console.log("log parseado", converter.unmarshall(record.dynamodb.NewImage))
  }
  return { message: 'Function executed successfully!', event };
};
