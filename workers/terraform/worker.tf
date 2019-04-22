resource "cloudflare_worker_script" "edgecalculator_worker" {
  zone = "${var.zone}"
  content = "${file("../dist/worker.js")}"
}

resource "cloudflare_worker_route" "edgecalculator_route" {
  zone = "${var.zone}"
  pattern = "edgecalculator.${var.zone}/*"
  enabled = true
  depends_on = ["cloudflare_worker_script.edgecalculator_worker"]
}