# webhooks

## intro

This program is a node server that listens to github webhooks. If the server recieves a new event, it looks if it is a package that is completed with the right tag's, if so it will pull the updated docker packages.

## to run

```npm run serve```

## resources

a list off all github webhook events:
[webhook events](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)

link to the used library to handle the webhooks:

[webhook library](https://github.com/rvagg/github-webhook-handler)
