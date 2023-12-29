-- Remove the trigger and function for Tezos transactions
DROP TRIGGER IF EXISTS update_transactions_tezos_trigger ON tezos_transaction_info;
DROP FUNCTION IF EXISTS update_transactions_tezos();

-- Remove the trigger and function for Stripe transactions
DROP TRIGGER IF EXISTS update_transactions_stripe_trigger ON stripe_transaction_info;
DROP FUNCTION IF EXISTS update_transactions_stripe();
