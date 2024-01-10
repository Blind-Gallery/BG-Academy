
comment on column "public"."payments"."id" is E'store information about the payments';
alter table "public"."payments" alter column "id" set default gen_random_uuid();
alter table "public"."payments" add constraint "payments_id_key" unique (id);
alter table "public"."payments" alter column "id" drop not null;
alter table "public"."payments" add column "id" text;

alter table "public"."transactions"
  add constraint "transactions_payment_id_fkey"
  foreign key (payment_id)
  references "public"."payments"
  (id) on update cascade on delete no action;
alter table "public"."transactions" alter column "payment_id" drop not null;
alter table "public"."transactions" add column "payment_id" text;

alter table "public"."transactions" drop constraint "transactions_payment_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."transactions" add column "payment_id" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."payments" add column "id" text
--  not null unique default gen_random_uuid();

alter table "public"."tezos_transaction_info" alter column "wallet" set not null;

alter table "public"."tezos_transaction_info" alter column "amount" set not null;

alter table "public"."stripe_transaction_info" alter column "payment_intent_client_secret" set not null;

alter table "public"."stripe_transaction_info" alter column "payment_intent" set not null;

alter table "public"."stripe_transaction_info" alter column "amount" set not null;
