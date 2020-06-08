resource "aws_iam_policy" "bookings_stream_consumer_policy" {
  name        = "${var.environment}-bookings-stream-consumer-policy"
  description = "My test policy"

  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl",{
    action = join("\",\"",["dynamodb:DescribeStream",
                           "dynamodb:GetRecords",
                           "dynamodb:GetShardIterator",
                           "dynamodb:ListStreams"]),
    resource =  "${aws_dynamodb_table.bookings.stream_arn}"
  })
}
