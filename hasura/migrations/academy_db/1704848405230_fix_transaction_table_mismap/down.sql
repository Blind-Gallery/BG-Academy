
alter table "public"."transactions"
  add constraint "transactions_type_fkey"
  foreign key (type)
  references "public"."transaction_types"
  (name) on update cascade on delete cascade;
alter table "public"."transactions" alter column "type" drop not null;
alter table "public"."transactions" add column "type" text;

alter table "public"."payments" drop constraint "payments_transaction_type_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."payments" add column "transaction_type" text
--  null;

alter table "public"."tezos_transaction_info" alter column "operation_hash" set not null;

ALTER TABLE "public"."tezos_transaction_info" ALTER COLUMN "amount" TYPE integer;
