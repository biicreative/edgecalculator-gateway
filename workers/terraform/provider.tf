variable "email" {}
variable "token" {}
variable "zone" {}
variable "record-value" {}

provider "cloudflare" {
    email = "${var.email}"
    token = "${var.token}"
}