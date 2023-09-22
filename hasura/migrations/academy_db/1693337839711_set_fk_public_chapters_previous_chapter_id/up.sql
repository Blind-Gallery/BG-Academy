alter table "public"."chapters"
  add constraint "chapters_previous_chapter_id_fkey"
  foreign key ("previous_chapter_id")
  references "public"."chapters"
  ("id") on update cascade on delete cascade;
