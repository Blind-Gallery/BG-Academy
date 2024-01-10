
alter table "public"."stripe_transaction_info" alter column "amount" drop not null;

alter table "public"."stripe_transaction_info" alter column "payment_intent" drop not null;

alter table "public"."stripe_transaction_info" alter column "payment_intent_client_secret" drop not null;

alter table "public"."tezos_transaction_info" alter column "amount" drop not null;

alter table "public"."tezos_transaction_info" alter column "wallet" drop not null;

alter table "public"."payments" add column "id" text
 not null unique default gen_random_uuid();

alter table "public"."transactions" add column "payment_id" text
 null;

alter table "public"."transactions"
  add constraint "transactions_payment_id_fkey"
  foreign key ("payment_id")
  references "public"."payments"
  ("id") on update cascade on delete no action;

alter table "public"."transactions" drop column "payment_id" cascade;

alter table "public"."payments" drop column "id" cascade;
