
alter table "public"."stripe_transaction_info" drop column "course_id" cascade;

alter table "public"."stripe_transaction_info" add column "course_id" integer
 not null;

alter table "public"."stripe_transaction_info"
  add constraint "stripe_transaction_info_course_id_fkey"
  foreign key ("course_id")
  references "public"."courses"
  ("id") on update cascade on delete no action;

alter table "public"."transactions" drop constraint "transactions_transaction_id_fkey";

alter table "public"."transactions" drop constraint "transactions_transaction_id_fkey1";

alter table "public"."transactions" add constraint "transactions_transaction_id_key" unique ("transaction_id");

alter table "public"."stripe_transaction_info"
  add constraint "stripe_transaction_info_id_fkey"
  foreign key ("id")
  references "public"."transactions"
  ("transaction_id") on update cascade on delete no action;

alter table "public"."tezos_transaction_info"
  add constraint "tezos_transaction_info_id_fkey"
  foreign key ("id")
  references "public"."transactions"
  ("transaction_id") on update cascade on delete no action;

alter table "public"."payments" add column "course_id" integer
 null;

alter table "public"."payments" add column "transaction_type" text
 not null;

alter table "public"."payments"
  add constraint "payments_course_id_fkey"
  foreign key ("course_id")
  references "public"."courses"
  ("id") on update cascade on delete no action;

alter table "public"."payments"
  add constraint "payments_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update cascade on delete no action;

DROP TRIGGER "update_transactions_tezos_trigger" ON "public"."tezos_transaction_info";

DROP TRIGGER "update_transactions_stripe_trigger" ON "public"."stripe_transaction_info";

alter table "public"."tezos_transaction_info" drop column "course_id" cascade;

alter table "public"."tezos_transaction_info" rename column "user_id" to "wallet";

alter table "public"."stripe_transaction_info" drop column "course_id" cascade;

alter table "public"."stripe_transaction_info" drop column "user_id" cascade;

alter table "public"."payments"
  add constraint "payments_transaction_id_fkey"
  foreign key ("transaction_id")
  references "public"."transactions"
  ("id") on update cascade on delete no action;

alter table "public"."transactions"
  add constraint "transactions_transaction_id_fkey"
  foreign key ("transaction_id")
  references "public"."tezos_transaction_info"
  ("id") on update cascade on delete no action;

alter table "public"."transactions"
  add constraint "transactions_transaction_id_fkey2"
  foreign key ("transaction_id")
  references "public"."stripe_transaction_info"
  ("id") on update cascade on delete no action;

alter table "public"."transactions" drop constraint "transactions_transaction_id_fkey2";

alter table "public"."transactions" rename column "transaction_id" to "tezos_transaction_id";

alter table "public"."transactions" alter column "tezos_transaction_id" drop not null;

alter table "public"."transactions" add column "stripe_transaction_id" text
 null unique;

alter table "public"."transactions"
  add constraint "transactions_stripe_transaction_id_fkey"
  foreign key ("stripe_transaction_id")
  references "public"."stripe_transaction_info"
  ("id") on update cascade on delete no action;

alter table "public"."stripe_transaction_info" drop constraint "stripe_transaction_info_id_fkey",
  add constraint "stripe_transaction_info_id_fkey"
  foreign key ("id")
  references "public"."transactions"
  ("stripe_transaction_id") on update cascade on delete no action;

alter table "public"."stripe_transaction_info" drop constraint "stripe_transaction_info_id_fkey";

alter table "public"."payments" drop column "transaction_type" cascade;

BEGIN TRANSACTION;
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_pkey";

ALTER TABLE "public"."payments"
    ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("user_id", "course_id");
COMMIT TRANSACTION;

alter table "public"."payments" drop column "id" cascade;
