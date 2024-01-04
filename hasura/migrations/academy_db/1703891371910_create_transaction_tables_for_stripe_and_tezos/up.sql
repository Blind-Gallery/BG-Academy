
alter table "public"."tezos_transaction_info" add column "course_id" numeric
 not null;

ALTER TABLE "public"."tezos_transaction_info" ALTER COLUMN "course_id" TYPE int4;

alter table "public"."tezos_transaction_info"
  add constraint "tezos_transaction_info_course_id_fkey"
  foreign key ("course_id")
  references "public"."courses"
  ("id") on update cascade on delete no action;

alter table "public"."tezos_transaction_info" add column "user_id" text
 not null;

alter table "public"."tezos_transaction_info"
  add constraint "tezos_transaction_info_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update cascade on delete no action;

alter table "public"."tezos_transaction_info" drop column "wallet" cascade;

alter table "public"."tezos_transaction_info" drop column "type" cascade;

CREATE TABLE "public"."stripe_transaction_info" ("id" text NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_id" text NOT NULL, "course_id" text NOT NULL, "amount" numeric NOT NULL, "payment_intent" text NOT NULL, "payment_intent_client_secret" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
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
CREATE TRIGGER "set_public_stripe_transaction_info_updated_at"
BEFORE UPDATE ON "public"."stripe_transaction_info"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_stripe_transaction_info_updated_at" ON "public"."stripe_transaction_info"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."transactions" ("id" text NOT NULL DEFAULT gen_random_uuid(), "updated_at" timestamptz NOT NULL DEFAULT now(), "created_at" timestamptz NOT NULL DEFAULT now(), "transaction_id" text NOT NULL, "type" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("type") REFERENCES "public"."transaction_types"("name") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("transaction_id") REFERENCES "public"."stripe_transaction_info"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("transaction_id") REFERENCES "public"."tezos_transaction_info"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_transactions_updated_at"
BEFORE UPDATE ON "public"."transactions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_transactions_updated_at" ON "public"."transactions"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
