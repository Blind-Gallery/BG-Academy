alter table "public"."payments"
  add constraint "payments_course_new_id_fkey"
  foreign key ("course_new_id")
  references "public"."courses"
  ("new_id") on update cascade on delete cascade;
