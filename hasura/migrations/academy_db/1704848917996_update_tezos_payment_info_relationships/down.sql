
alter table "public"."tezos_transaction_info"
  add constraint "tezos_transaction_info_id_fkey"
  foreign key ("id")
  references "public"."transactions"
  ("tezos_transaction_id") on update cascade on delete no action;

alter table "public"."tezos_transaction_info"
  add constraint "tezos_transaction_info_user_id_fkey"
  foreign key ("wallet")
  references "public"."users"
  ("id") on update cascade on delete no action;

alter table "public"."tezos_transaction_info" drop constraint "tezos_transaction_info_wallet_fkey";
