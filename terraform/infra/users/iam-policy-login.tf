resource "aws_iam_policy" "login_policy" {
  name        = "${var.environment}-login-policy"
  description = "My test policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamoDb:Query"
      ],
      "Effect": "Allow",
      "Resource": "${aws_dynamodb_table.users.arn}/index/${var.environment}-email-gsi"
    },
    {
      "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"      
    }
  ]
}
EOF
}
