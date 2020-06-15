{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "${resource}",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${source_arn}"
        }
      }
    }
  ]
}