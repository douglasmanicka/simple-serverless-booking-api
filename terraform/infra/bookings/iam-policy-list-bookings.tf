resource "aws_iam_policy" "list_bookings_policy" {
  name        = "${var.environment}-list-bookings-policy"
  description = "My test policy"

  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl",{
    action = "dynamodb:Scan",
    resource =  "${aws_dynamodb_table.bookings.arn}"
  })
}
