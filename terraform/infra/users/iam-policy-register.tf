resource "aws_iam_policy" "register_policy" {
  name        = "${var.environment}-register-policy"
  description = "My test policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamoDb:PutItem"
      ],
      "Effect": "Allow",
      "Resource": "${aws_dynamodb_table.users.arn}"
    }
  ]
}
EOF
}
