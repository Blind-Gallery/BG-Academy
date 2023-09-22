alter table "public"."courses"
  add constraint "courses_language_fkey"
  foreign key ("language")
  references "public"."language_catalog"
  ("name") on update set null on delete set null;
