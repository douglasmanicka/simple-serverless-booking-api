module "users" {
  source = "../../infra/users"
  environment = "${var.environment}"
  read_capacity = 1
  write_capacity = 1
  jwt_secret = "${var.jwt_secret}"
}

module "boookings" {
  source = "../../infra/bookings"
  environment = "${var.environment}"
  read_capacity = 1
  write_capacity = 1
}

