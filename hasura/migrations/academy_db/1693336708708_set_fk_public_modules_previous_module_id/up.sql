alter table "public"."modules"
  add constraint "modules_previous_module_id_fkey"
  foreign key ("previous_module_id")
  references "public"."modules"
  ("id") on update set null on delete set null;
