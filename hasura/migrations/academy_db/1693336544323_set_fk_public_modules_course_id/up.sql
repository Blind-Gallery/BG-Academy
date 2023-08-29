alter table "public"."modules" drop constraint "modules_course_id_fkey",
  add constraint "modules_course_id_fkey"
  foreign key ("course_id")
  references "public"."courses"
  ("id") on update cascade on delete cascade;
