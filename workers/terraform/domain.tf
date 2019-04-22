resource "cloudflare_record" "edgecalculator_record" {
  domain  = "${var.zone}"
  name    = "edgecalculator"
  value   = "${var.record-value}"
  type    = "CNAME"
  proxied = true
}