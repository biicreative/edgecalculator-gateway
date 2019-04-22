# Edge Calculator Gateway

## Cloudflare Workers

**Build:**

```
cd workers
yarn install && yarn build
```

**Deploy with Terraform:**

`cd terraform && terraform init`

```
terraform import -var email=$CF_EMAIL -var token=$CF_TOKEN cloudflare_worker_script.edgecalculator_worker zone:$CF_ZONE
```

```
terraform apply -var email=$CF_EMAIL -var token=$CF_TOKEN -var zone=$CF_ZONE -var record-value=$CF_RECORD_VALUE | grep -v "<computed>"
```

## License

MIT
