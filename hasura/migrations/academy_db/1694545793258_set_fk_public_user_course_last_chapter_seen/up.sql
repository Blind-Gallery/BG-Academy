alter table "public"."user_course"
  add constraint "user_course_last_chapter_seen_fkey"
  foreign key ("last_chapter_seen")
  references "public"."chapters"
  ("id") on update cascade on delete cascade;
