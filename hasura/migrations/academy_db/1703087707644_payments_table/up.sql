
CREATE TABLE "public"."payments" ("id" text NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_id" text NOT NULL, "transaction_id" text NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("transaction_id"));COMMENT ON TABLE "public"."payments" IS E'store information about the payments';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_payments_updated_at"
BEFORE UPDATE ON "public"."payments"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_payments_updated_at" ON "public"."payments"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."transactions" ("type" text NOT NULL, PRIMARY KEY ("type") );

INSERT INTO "public"."transactions"("type") VALUES (E'stripe');

INSERT INTO "public"."transactions"("type") VALUES (E'tezos');

DROP table "public"."transactions";

CREATE TABLE "public"."transaction_types" ("name" text NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("name") );

INSERT INTO "public"."transaction_types"("name") VALUES (E'stripe');

INSERT INTO "public"."transaction_types"("name") VALUES (E'tezos');

CREATE TABLE "public"."tezos_transaction_info" ("id" text NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "type" text NOT NULL, "operation_hash" text NOT NULL, "amount" integer NOT NULL, "wallet" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("type") REFERENCES "public"."transaction_types"("name") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("wallet") REFERENCES "public"."tezos"("wallet") ON UPDATE no action ON DELETE no action);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_tezos_transaction_info_updated_at"
BEFORE UPDATE ON "public"."tezos_transaction_info"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_tezos_transaction_info_updated_at" ON "public"."tezos_transaction_info"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
