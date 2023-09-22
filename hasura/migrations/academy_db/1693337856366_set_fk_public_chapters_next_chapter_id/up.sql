alter table "public"."chapters"
  add constraint "chapters_next_chapter_id_fkey"
  foreign key ("next_chapter_id")
  references "public"."chapters"
  ("id") on update cascade on delete cascade;
