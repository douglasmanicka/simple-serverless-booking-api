'use strict';

const AWS =  require('aws-sdk')
const converter =  AWS.DynamoDB.Converter 
const moment = require('moment')
moment.locale('en')


module.exports.listen = async event => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const reserva = converter.unmarshall(record.dynamodb.NewImage)
      console.log(`Reservation made: the user ${reserva.user.name} - ${reserva.user.email} has scheduled a time : ${moment(reserva.date).format('LLLL')}`)
    }
  }
  return { message: 'Function executed successfully!', event };
};
