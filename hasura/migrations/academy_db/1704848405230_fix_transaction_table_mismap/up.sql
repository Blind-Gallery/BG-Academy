
ALTER TABLE "public"."tezos_transaction_info" ALTER COLUMN "amount" TYPE numeric;

alter table "public"."tezos_transaction_info" alter column "operation_hash" drop not null;

alter table "public"."payments" add column "transaction_type" text
 null;

alter table "public"."payments"
  add constraint "payments_transaction_type_fkey"
  foreign key ("transaction_type")
  references "public"."transaction_types"
  ("name") on update cascade on delete no action;

alter table "public"."transactions" drop column "type" cascade;
