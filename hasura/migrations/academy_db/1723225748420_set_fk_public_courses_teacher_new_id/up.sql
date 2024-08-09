alter table "public"."courses"
  add constraint "courses_teacher_new_id_fkey"
  foreign key ("teacher_new_id")
  references "public"."teachers"
  ("new_id") on update cascade on delete cascade;
