
DROP TABLE "public"."transactions";

DROP TABLE "public"."stripe_transaction_info";

alter table "public"."tezos_transaction_info"
  add constraint "tezos_transaction_info_type_fkey"
  foreign key (type)
  references "public"."transaction_types"
  (name) on update cascade on delete cascade;
alter table "public"."tezos_transaction_info" alter column "type" drop not null;
alter table "public"."tezos_transaction_info" add column "type" text;

alter table "public"."tezos_transaction_info"
  add constraint "tezos_transaction_info_wallet_fkey"
  foreign key (wallet)
  references "public"."tezos"
  (wallet) on update no action on delete no action;
alter table "public"."tezos_transaction_info" alter column "wallet" drop not null;
alter table "public"."tezos_transaction_info" add column "wallet" text;

alter table "public"."tezos_transaction_info" drop constraint "tezos_transaction_info_user_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."tezos_transaction_info" add column "user_id" text
--  not null;

alter table "public"."tezos_transaction_info" drop constraint "tezos_transaction_info_course_id_fkey";

ALTER TABLE "public"."tezos_transaction_info" ALTER COLUMN "course_id" TYPE numeric;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."tezos_transaction_info" add column "course_id" numeric
--  not null;
