alter table "public"."tezos"
  add constraint "tezos_id_fkey"
  foreign key ("id")
  references "public"."users"
  ("id") on update set null on delete set null;
