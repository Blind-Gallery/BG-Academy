alter table "public"."user_course"
  add constraint "user_course_user_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update no action on delete no action;
