resource "aws_iam_policy" "register_policy" {
  name        = "${var.environment}-register-policy"
  description = "My test policy"


  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl",{
    action = "dynamodb:PutItem",
    resource =  "${aws_dynamodb_table.users.arn}"
  })
}
