
comment on column "public"."payments"."id" is E'store information about the payments';
alter table "public"."payments" alter column "id" set default gen_random_uuid();
alter table "public"."payments" alter column "id" drop not null;
alter table "public"."payments" add column "id" text;

alter table "public"."payments" drop constraint "payments_pkey";
alter table "public"."payments"
    add constraint "payments_pkey"
    primary key ("id");

comment on column "public"."payments"."transaction_type" is E'store information about the payments';
alter table "public"."payments" alter column "transaction_type" drop not null;
alter table "public"."payments" add column "transaction_type" text;

alter table "public"."stripe_transaction_info"
  add constraint "stripe_transaction_info_id_fkey"
  foreign key ("id")
  references "public"."transactions"
  ("stripe_transaction_id") on update cascade on delete no action;

alter table "public"."stripe_transaction_info" drop constraint "stripe_transaction_info_id_fkey",
  add constraint "stripe_transaction_info_id_fkey"
  foreign key ("id")
  references "public"."transactions"
  ("tezos_transaction_id") on update cascade on delete no action;

alter table "public"."transactions" drop constraint "transactions_stripe_transaction_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."transactions" add column "stripe_transaction_id" text
--  null unique;

alter table "public"."transactions" alter column "tezos_transaction_id" set not null;

alter table "public"."transactions" rename column "tezos_transaction_id" to "transaction_id";

alter table "public"."transactions"
  add constraint "transactions_transaction_id_fkey2"
  foreign key ("transaction_id")
  references "public"."stripe_transaction_info"
  ("id") on update cascade on delete no action;

alter table "public"."transactions" drop constraint "transactions_transaction_id_fkey2";

alter table "public"."transactions" drop constraint "transactions_transaction_id_fkey";

alter table "public"."payments" drop constraint "payments_transaction_id_fkey";

alter table "public"."stripe_transaction_info" alter column "user_id" drop not null;
alter table "public"."stripe_transaction_info" add column "user_id" text;

alter table "public"."stripe_transaction_info"
  add constraint "stripe_transaction_info_course_id_fkey"
  foreign key (course_id)
  references "public"."courses"
  (id) on update cascade on delete no action;
alter table "public"."stripe_transaction_info" alter column "course_id" drop not null;
alter table "public"."stripe_transaction_info" add column "course_id" int4;

alter table "public"."tezos_transaction_info" rename column "wallet" to "user_id";

alter table "public"."tezos_transaction_info"
  add constraint "tezos_transaction_info_course_id_fkey"
  foreign key (course_id)
  references "public"."courses"
  (id) on update cascade on delete no action;
alter table "public"."tezos_transaction_info" alter column "course_id" drop not null;
alter table "public"."tezos_transaction_info" add column "course_id" int4;

CREATE TRIGGER "update_transactions_stripe_trigger"
AFTER INSERT ON "public"."stripe_transaction_info"
FOR EACH ROW EXECUTE FUNCTION update_transactions_stripe();

CREATE TRIGGER "update_transactions_tezos_trigger"
AFTER INSERT ON "public"."tezos_transaction_info"
FOR EACH ROW EXECUTE FUNCTION update_transactions_tezos();

alter table "public"."payments" drop constraint "payments_user_id_fkey";

alter table "public"."payments" drop constraint "payments_course_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."payments" add column "transaction_type" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."payments" add column "course_id" integer
--  null;

alter table "public"."tezos_transaction_info" drop constraint "tezos_transaction_info_id_fkey";

alter table "public"."stripe_transaction_info" drop constraint "stripe_transaction_info_id_fkey";

alter table "public"."transactions" drop constraint "transactions_transaction_id_key";

alter table "public"."transactions"
  add constraint "transactions_transaction_id_fkey1"
  foreign key ("transaction_id")
  references "public"."tezos_transaction_info"
  ("id") on update cascade on delete cascade;

alter table "public"."transactions"
  add constraint "transactions_transaction_id_fkey"
  foreign key ("transaction_id")
  references "public"."stripe_transaction_info"
  ("id") on update cascade on delete cascade;

alter table "public"."stripe_transaction_info" drop constraint "stripe_transaction_info_course_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."stripe_transaction_info" add column "course_id" integer
--  not null;

alter table "public"."stripe_transaction_info" alter column "course_id" drop not null;
alter table "public"."stripe_transaction_info" add column "course_id" text;
