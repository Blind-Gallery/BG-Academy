alter table "public"."user_course"
  add constraint "user_course_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update set null on delete set null;
