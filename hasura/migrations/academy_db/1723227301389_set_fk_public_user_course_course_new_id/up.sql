alter table "public"."user_course"
  add constraint "user_course_course_new_id_fkey"
  foreign key ("course_new_id")
  references "public"."courses"
  ("new_id") on update cascade on delete cascade;
