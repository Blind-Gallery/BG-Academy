alter table "public"."user_chapter" drop constraint "user_chapter_pkey";
alter table "public"."user_chapter"
    add constraint "user_chapter_pkey"
    primary key ("id");
