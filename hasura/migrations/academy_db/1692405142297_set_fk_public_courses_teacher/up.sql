alter table "public"."courses"
  add constraint "courses_teacher_fkey"
  foreign key ("teacher")
  references "public"."teachers"
  ("id") on update cascade on delete cascade;
