alter table "public"."emails"
  add constraint "emails_id_fkey"
  foreign key ("id")
  references "public"."users"
  ("id") on update set null on delete set null;
