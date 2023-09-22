alter table "public"."courses"
  add constraint "courses_level_fkey"
  foreign key ("level")
  references "public"."level_catalog"
  ("name") on update restrict on delete restrict;
