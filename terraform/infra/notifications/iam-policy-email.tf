resource "aws_iam_policy" "email_policy" {
  name        = "${var.environment}-email-policy"
  description = "My test policy"

  policy = templatefile("${path.module}/templates/lambda-sqs-policy.tpl",{
    action = join("\",\"",["sqs:ReceiveMessage",
                           "sqs:DeleteMessage",
                           "sqs:GetQueueAttributes"]),
    resource =  "${aws_sqs_queue.email.arn}",
    sns_publish_enable = "false"
  })
}
