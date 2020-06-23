
'use strict';

const AWS =  require('aws-sdk')
AWS.config.update({
  region: process.env.AWS_REGION
})

const SNS =  new AWS.SNS()

module.exports.send = async event => {
    for (const record of event.Records) {
        const message = JSON.parse(record.body).Message
        console.log("Sending message", message, "to receiver", process.env.SMS_PHONE_TO);
        try {
          let data = await SNS.publish({
            Message: message,
            MessageAttributes: {
              'AWS.SNS.SMS.SMSType': {
                DataType: 'String',
                StringValue: 'Promotional'
              }
            },
            PhoneNumber: process.env.SMS_PHONE_TO
          }).promise()
      
          console.log("SMS sent successfully");
          console.log("Sent message to", process.env.SMS_PHONE_TO);
          console.log("event = ", event);
          return data;
      
        } catch (err) {
          console.log("Sending failed", err);
          throw err;
        }

    }
 
};





