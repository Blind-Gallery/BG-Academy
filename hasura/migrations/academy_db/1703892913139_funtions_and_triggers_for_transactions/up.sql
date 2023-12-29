-- Function to update transactions table on tezos_transaction_info insertion
CREATE OR REPLACE FUNCTION update_transactions_tezos()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO transactions (id, updated_at, created_at, transaction_id, type)
    VALUES (NEW.id, NOW(), NOW(), NEW.id, 'tezos');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to execute the function after INSERT on tezos_transaction_info
CREATE TRIGGER update_transactions_tezos_trigger
AFTER INSERT ON tezos_transaction_info
FOR EACH ROW
EXECUTE FUNCTION update_transactions_tezos();

-- Function to update transactions table on stripe_transaction_info insertion
CREATE OR REPLACE FUNCTION update_transactions_stripe()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO transactions (id, updated_at, created_at, transaction_id, type)
    VALUES (NEW.id, NOW(), NOW(), NEW.id, 'stripe');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to execute the function after INSERT on stripe_transaction_info
CREATE TRIGGER update_transactions_stripe_trigger
AFTER INSERT ON stripe_transaction_info
FOR EACH ROW
EXECUTE FUNCTION update_transactions_stripe();
