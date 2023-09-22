alter table "public"."emails" drop constraint "emails_id_fkey",
  add constraint "emails_id_fkey"
  foreign key ("id")
  references "public"."users"
  ("id") on update cascade on delete cascade;
