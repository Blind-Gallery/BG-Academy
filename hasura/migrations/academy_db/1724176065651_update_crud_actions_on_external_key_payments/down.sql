
alter table "public"."transactions" drop constraint "transactions_stripe_transaction_id_fkey",
  add constraint "transactions_stripe_transaction_id_fkey"
  foreign key ("stripe_transaction_id")
  references "public"."stripe_transaction_info"
  ("id") on update set null on delete set null;

alter table "public"."transactions" drop constraint "transactions_tezos_transaction_id_fkey",
  add constraint "transactions_transaction_id_fkey"
  foreign key ("tezos_transaction_id")
  references "public"."tezos_transaction_info"
  ("id") on update cascade on delete no action;

alter table "public"."transactions" drop constraint "transactions_stripe_transaction_id_fkey",
  add constraint "transactions_stripe_transaction_id_fkey"
  foreign key ("stripe_transaction_id")
  references "public"."stripe_transaction_info"
  ("id") on update cascade on delete no action;
