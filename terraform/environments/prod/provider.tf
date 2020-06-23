# Configure the AWS Provider
provider "aws" {
  region  = "${var.region}"
  profile  = "terraform-serverless" //you can use a profile to use multiple aws accounts(~/.aws/credentials)
}


