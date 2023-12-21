# Payment methods

This service connects the stripe account using the stripe webhook, this endpoint is expected to be used only by stripe customers

## To test locally

### Install dependencies

Download the latest linux tar.gz file from [GitHub](https://github.com/stripe/stripe-cli/releases).
Unzip the file: tar -xvf stripe_X.X.X_linux_x86_64.tar.gz.
Move ./stripe to your execution path (make it an alias)

### Login to stripe

```bash
stripe login
```

### Connect the webhook

```bash
stripe listen --forward-to localhost:5000/payments/stripe
```

### Trigger the webhook

```bash
stripe trigger payment_intent.succeeded
```
