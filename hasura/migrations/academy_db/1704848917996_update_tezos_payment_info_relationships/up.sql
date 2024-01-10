
alter table "public"."tezos_transaction_info"
  add constraint "tezos_transaction_info_wallet_fkey"
  foreign key ("wallet")
  references "public"."tezos"
  ("wallet") on update cascade on delete no action;

alter table "public"."tezos_transaction_info" drop constraint "tezos_transaction_info_user_id_fkey";

alter table "public"."tezos_transaction_info" drop constraint "tezos_transaction_info_id_fkey";
