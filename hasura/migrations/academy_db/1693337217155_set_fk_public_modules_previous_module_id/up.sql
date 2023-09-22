alter table "public"."modules" drop constraint "modules_previous_module_id_fkey",
  add constraint "modules_previous_module_id_fkey"
  foreign key ("previous_module_id")
  references "public"."modules"
  ("id") on update cascade on delete cascade;
