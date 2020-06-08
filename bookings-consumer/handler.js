'use strict';

const AWS =  require('aws-sdk')
AWS.config.update({
  region: process.env.AWS_REGION
})

const SNS =  new AWS.SNS()
const converter =  AWS.DynamoDB.Converter 
const moment = require('moment')
moment.locale('en')


module.exports.listen = async event => {
  const snsPromises = []
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const reserva = converter.unmarshall(record.dynamodb.NewImage)
      // console.log(`Reservation made: the user ${reserva.user.name} - ${reserva.user.email} has scheduled a time : ${moment(reserva.date).format('LLLL')}`)
      snsPromises.push(SNS.publish({
        TopicArn: process.env.SNS_NOTIFICATIONS_TOPIC,
        Message: `Reservation made: the user ${reserva.user.name} - ${reserva.user.email} has scheduled a time : ${moment(reserva.date).format('LLLL')}`
      }).promise())
    }
  }
  await Promise.all(snsPromises)
  console.log("successfully sent messages")
  return { message: 'Function executed successfully!', event };
};
